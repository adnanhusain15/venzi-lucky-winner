"use client";
import FullScreenLoader from "@/components/FullScreenLoader";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/Features/useForm";
import clsx from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import LOGO_IMG from "../../../public/images/LOGO.png";

export default function Home() {
  const { formId } = useParams();
  const {
    form,
    users,
    activeIndex,
    syncForm,
    isLoading,
    isDrawing,
    selected,
    animateNames,
    handleFileChange,
    currentWinner,
    remainingCount,
  } = useForm(formId as string);
  // const image = BG_IMG.src;
  const logoImage = LOGO_IMG.src;
  const image = form?.theme.background.href;
  const wImage = form?.welcome_screens[0]?.attachment.href;
  const winnerName = isDrawing
    ? activeIndex > -1
      ? users?.[activeIndex]?.fullName
      : ""
    : currentWinner?.fullName || "";
  return (
    <>
      {isLoading ? <FullScreenLoader /> : null}

      <div className="fixed top-0 left-0 p-5 bg-white">
        <Image src={logoImage} alt="logo" width={120} height={50} />
      </div>
      <Section
        style={
          image
            ? {
                backgroundImage: `url('${image}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "80vw 80vh",
                backgroundPosition: "center",
                backgroundColor: "white",
              }
            : {}
        }
        className={clsx(`h-screen w-screen rounded-lg`)}
        containerClassName="flex-col items-center justify-center rounded-lg"
      >
        {wImage ? (
          <Image
            width={0}
            height={0}
            className="absolute opacity-30 !h-[80vh] !w-[90vw] object-contain"
            alt="welcome-image"
            src={wImage}
            unoptimized
          />
        ) : null}
        <div className="z-20 flex h-full flex-col w-full text-center  justify-center items-center  gap-5 text-white">
          {form ? (
            <>
              <h1 className="text-4xl font-bold">
                Live Prize Draw for {form.title}
              </h1>
              {users.length ? (
                <div className="w-2/3 flex flex-col text-center  justify-center items-center gap-3">
                  <h2 className="text-center text-2xl font-bold transform transition duration-500">
                    Winner&apos;s Name:
                  </h2>
                  {winnerName ? (
                    <h2
                      className={clsx(
                        "text-center text-2xl font-bold transform transition duration-500 py-1 px-3 rounded-md",
                        {
                          ["scale-150 border-yellow-500 border border-solid mb-1"]:
                            selected,
                        }
                      )}
                    >
                      {isDrawing
                        ? activeIndex > -1
                          ? users?.[activeIndex]?.fullName
                          : ""
                        : currentWinner?.fullName || ""}
                    </h2>
                  ) : null}
                  <div className="text-sm mb-2">
                    Remaining participants: {remainingCount}
                  </div>
                  <Button
                    className="w-full"
                    disabled={isDrawing || remainingCount === 0}
                    onClick={animateNames}
                  >
                    {isDrawing
                      ? "Drawing"
                      : remainingCount === 0
                      ? "No more participants"
                      : selected
                      ? "Draw next winner"
                      : "Start draw"}
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              onClick={syncForm}
              size="sm"
              className="text-black"
              disabled={isDrawing || isLoading}
            >
              Sync Form
            </Button>
            or
            <Input
              onChange={handleFileChange}
              id="csv"
              accept=".csv"
              type="file"
              className=""
              placeholder="Upload CSV"
              disabled={isDrawing || isLoading}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
