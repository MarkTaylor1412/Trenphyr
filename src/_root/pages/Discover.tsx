import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { infinitePostsMutation, searchPostsMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Discover = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: posts, fetchNextPage, hasNextPage } = infinitePostsMutation();
  const { data: searchedPosts, isFetching: isSearchFetching } = searchPostsMutation(debouncedValue);
  const {ref, inView} = useInView();

  const showSearchResults = searchValue !== "";
  const showPosts = !showSearchResults && posts?.pages.every((item) => item.documents.length === 0);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue])

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="discover-container">
      <div className="discover-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex w-full px-5 gap-1 rounded-lg bg-light-2">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            height={24}
            width={24}
          />
          <Input
            type="text"
            placeholder="Search for ..."
            className="discover-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-14 mb-6">
        <h3 className="body-bold md:h3-bold">Trending</h3>

        <div className="flex-center px-5 py-2 gap-3 rounded-xl cursor-pointer bg-light-2">
          <p className="small-medium md:base-medium">All</p>

          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            height={20}
            width={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full max-w-5xl gap-10">
        {showSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : showPosts ? (
          <p className="w-full text-center mt-12">No more posts to show.</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Discover