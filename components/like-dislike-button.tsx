"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { disLikes, Likes } from "@prisma/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { disLikePost, LikePost } from "@/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LikeAndDislikeButtonProps {
  likesCount: number;
  dislikesCount: number;
  likes: Likes[];
  dislikes: disLikes[];
  id: string;
}
const LikeAndDisLikeButton = ({
  likesCount,
  dislikesCount,
  dislikes,
  likes,
  id,
}: LikeAndDislikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisked, setIsDisLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [username, setUsername] = useState<string>("");
  const [likesNo, setLikesNo] = useState<number>(likesCount);
  const [dislikesNo, setDislikesNo] = useState<number>(dislikesCount);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username && likes.find((like) => like.username === username)) {
      setIsLiked(true);
      setIsDisLiked(false);
    } else if (
      username &&
      dislikes.find((dislike) => dislike.username === username)
    ) {
      setIsDisLiked(true);
      setIsLiked(false);
    }
  }, []);

  const addLike = async () => {
    setLoading(true);
    if (!username) return redirect("/username");
    const response = await LikePost(username, id);
    if (response) {
      setIsLiked(true);
      setIsDisLiked(false);
      setLikesNo((prev) => prev + 1);
      toast("ok");
    }
    setLoading(false);
  };

  const addDislike = async () => {
    setLoading(true);
    if (!username) return redirect("/username");

    const response = await disLikePost(username, id);
    if (response) {
      setIsDisLiked(true);
      setIsLiked(false);
      setDislikesNo((prev) => prev + 1);
      toast("ok");
    }
  };
  return (
    <div className="flex flex-col items-center text-xl font-bold">
      <button
        onClick={addLike}
        disabled={isLiked || loading}
        className={cn(
          "",
          isLiked &&
            "opacity-70 border rounded-md bg-secondary cursor-not-allowed"
        )}
      >
        👌
      </button>
      <span className={cn("")}>{likesNo - dislikesNo}</span>
      <button
        onClick={addDislike}
        className={cn(
          "",
          isDisked &&
            "opacity-70 border rounded-md bg-secondary cursor-not-allowed"
        )}
      >
        💩
      </button>
    </div>
  );
};

export default LikeAndDisLikeButton;
