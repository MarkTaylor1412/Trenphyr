import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { getPostByIdMutation } from "@/lib/react-query/queriesAndMutations";
import { formatDate } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = getPostByIdMutation(id || "");
  const { user } = useUserContext();

  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="creator"
                  className="rounded-full h-9 w-9 lg:h-12 lg:w-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-dark-1">{post?.creator.username}</p>
                  <div className="flex-center gap-2 text-dark-3">
                    <p className="subtle-semibold lg:small-regular">{formatDate(post?.$createdAt)}</p>
                    •
                    <p className="subtle-semibold lg:small-regular">{post?.location}</p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-1">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    height={20}
                    width={20}
                    alt="edit"
                  />
                </Link>

                <Button
                  variant="ghost"
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    height={20}
                    width={20}
                    alt="delete"
                  />
                </Button>
              </div>
            </div>

            <hr className="w-full border border-light-4/80" />
            <div className="flex flex-1 flex-col w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-2 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
                <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails