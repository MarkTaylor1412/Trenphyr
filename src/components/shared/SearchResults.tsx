import { SearchResultsProps } from "@/types"
import Loader from "./Loader"
import GridPostList from "./GridPostList"

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
    if (isSearchFetching) return <Loader />

    if (searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }

    return (
        <p className="w-full text-center mt-12 text-dark-4">No results.</p>
    )
}

export default SearchResults