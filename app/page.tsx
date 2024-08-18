import TimeAgo from "javascript-time-ago";
import Navbar from "@/components/navbar";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHotHacks, getNewHacks, getTopHacks } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import LikeAndDisLikeButton from "@/components/like-dislike-button";
// English.
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");
export default async function Home() {
  const topHacks = await getTopHacks();
  const newHacks = await getNewHacks();
  const hotHacks = await getHotHacks();

  return (
    <main className="max-w-2xl p-2 mx-auto">
      <Navbar />
      <div className="mx-auto text-center mt-10">
        <h2 className="text-4xl font-extrabold">
          Top 20 productivity hacks chosen by internet and you
        </h2>
        <p className="text-muted-foreground pt-3">
          Upvote | Downvote your favorites. Write your best. No account needed
        </p>
      </div>

      <Tabs defaultValue="top" className="w-full  mt-10">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="top" className="col-span-1">
            Top
          </TabsTrigger>
          <TabsTrigger value="hot" className="col-span-1">
            Hot
          </TabsTrigger>
          <TabsTrigger value="new" className="col-span-1">
            New
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          {topHacks ? (
            <div className="flex flex-col gap-y-4 mt-5">
              {topHacks.map((hack, key) => (
                <Card id={hack.id}>
                  <CardContent className="flex pt-4 items-center gap-x-2 px-6 justify-between">
                    <div className="flex items-center gap-x-2 text-lg">
                      <span className="text-muted-foreground">{key}.</span>
                      <div>{hack.content}</div>
                    </div>
                    <LikeAndDisLikeButton
                      likesCount={hack._count.Likes}
                      dislikesCount={hack._count.disLikes}
                      likes={hack.Likes}
                      dislikes={hack.disLikes}
                      id={hack.id}
                    />
                  </CardContent>
                  <CardFooter className="pb-1">
                    <div className="text-xs flex items-center gap-x-1 text-muted-foreground">
                      By
                      <span>{hack.author}</span>
                      on
                      <span>{timeAgo.format(hack.createdAt.getTime())}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <CardDescription>No hacks yet. Add one</CardDescription>
          )}
        </TabsContent>

        <TabsContent value="hot">
          {topHacks ? (
            <div className="flex flex-col gap-y-4 mt-5">
              {topHacks.map((hack, key) => (
                <Card id={hack.id}>
                  <CardContent className="flex pt-4 items-center gap-x-2 px-6 justify-between">
                    <div className="flex items-center gap-x-2 text-lg">
                      <span className="text-muted-foreground">{key}.</span>
                      <div>{hack.content}</div>
                    </div>
                    <LikeAndDisLikeButton
                      likesCount={hack._count.Likes}
                      dislikesCount={hack._count.disLikes}
                      likes={hack.Likes}
                      dislikes={hack.disLikes}
                      id={hack.id}
                    />
                  </CardContent>
                  <CardFooter className="pb-1">
                    <div className="text-xs flex items-center gap-x-1 text-muted-foreground">
                      By
                      <span>{hack.author}</span>
                      on
                      <span>{timeAgo.format(hack.createdAt.getTime())}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <CardDescription>No hacks yet. Add one</CardDescription>
          )}
        </TabsContent>
        <TabsContent value="new">
          {newHacks ? (
            <div className="flex flex-col gap-y-4 mt-5">
              {newHacks.map((hack, key) => (
                <Card id={hack.id}>
                  <CardContent className="flex pt-4 items-center gap-x-2 px-6 justify-between">
                    <div className="flex items-center gap-x-2 text-lg">
                      <span className="text-muted-foreground">{key}.</span>
                      <div>{hack.content}</div>
                    </div>
                    <LikeAndDisLikeButton
                      likesCount={hack._count.Likes}
                      dislikesCount={hack._count.disLikes}
                      likes={hack.Likes}
                      dislikes={hack.disLikes}
                      id={hack.id}
                    />
                  </CardContent>
                  <CardFooter className="pb-1">
                    <div className="text-xs flex items-center gap-x-1 text-muted-foreground">
                      By
                      <span>{hack.author}</span>
                      on
                      <span>{timeAgo.format(hack.createdAt.getTime())}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <CardDescription>No hacks yet. Add one</CardDescription>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
