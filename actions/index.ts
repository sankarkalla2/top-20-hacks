"use server";

import db from "@/db";

export const createHack = async (username: string, content: string) => {
  try {
    const hack = await db.post.create({
      data: {
        content,
        author: username,
      },
      select: {
        content: true,
        author: true,
      },
    });

    return { status: 200, hack: hack };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "something  went wrong" };
  }
};

export const getTopHacks = async () => {
  try {
    const hacks = await db.post.findMany({
      include: {
        _count: {
          select: {
            Likes: true,
            disLikes: true,
          },
        },
        Likes: true,
        disLikes: true,
      },
      orderBy: {
        Likes: {
          _count: "desc",
        },
      },
      
    });

    return hacks;
  } catch (error) {
    console.log(error);
  }
};

export const getNewHacks = async () => {
  try {
    const newHacks = await db.post.findMany({
      include: {
        _count: {
          select: {
            Likes: true,
            disLikes: true,
          },
        },
        Likes: true,
        disLikes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return newHacks;
  } catch (error) {
    console.log(error);
  }
};

export const getHotHacks = async () => {
  try {
    const newHacks = await db.post.findMany({
      select: {
        id: true,
        author: true,
        content: true,
        Likes: true,
        disLikes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return newHacks;
  } catch (error) {
    console.log(error);
  }
};

export const LikePost = async (username: string, id: string) => {
  try {
    const isAlreadyLiked = await db.likes.findMany({
      where: {
        username,
        postid: id,
      },
      include: {
        Post: {
          select: {
            content: true,
          },
        },
      },
    });

    if (isAlreadyLiked.length) {
      console.log(isAlreadyLiked.length);
      return;
    }

    await db.disLikes.deleteMany({
      where: {
        username,
        postId: id,
      },
    });

    const like = await db.likes.create({
      data: {
        username,
        postid: id,
      },
    });

    if (like) return like;
  } catch (error) {
    console.log(error);
  }
};

export const disLikePost = async (username: string, id: string) => {
  try {
    const isAlreadyDisLiked = await db.disLikes.findMany({
      where: {
        username,
        postId: id,
      },
      include: {
        Post: {
          select: {
            content: true,
          },
        },
      },
    });

    if (isAlreadyDisLiked.length) {
      console.log(isAlreadyDisLiked.length);
      return;
    }

    await db.likes.deleteMany({
      where: {
        username,
        postid: id,
      },
    });

    const like = await db.disLikes.create({
      data: {
        username,
        postId: id,
      },
    });

    if (like) return like;
  } catch (error) {
    console.log(error);
  }
};
