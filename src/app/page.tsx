"use client";
import FullScreenLoader from "@/components/FullScreenLoader";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/Features/useForm";
import clsx from "clsx";
const formId = "p21dpHIw";
export default function Home() {
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
  } = useForm(formId);
  const image = form?.theme.background.href;
  const wImage = form?.welcome_screens[0]?.attachment.href;
  return (
    <>
      {isLoading ? <FullScreenLoader /> : null}

      <Section
        style={
          image
            ? {
                backgroundImage: `url('${image}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100vw 100vh",
              }
            : {}
        }
        className={clsx(`h-screen w-screen `)}
        containerClassName="flex-col items-center justify-center"
        backgroundImage={
          wImage ? (
            <div
              className="absolute z-10 w-screen h-screen opacity-30"
              style={{
                backgroundImage: `url('${wImage}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "65vw 85vh",
              }}
            ></div>
          ) : null
        }
      >
        <div className="z-20 flex h-full flex-col w-full text-center  justify-center items-center  gap-5 text-white">
          {form ? (
            <>
              <h1 className="text-4xl font-bold ">
                Lucky Draw for&nbsp;{form.title}
              </h1>
              {users.length ? (
                <div className="w-2/3 flex flex-col text-center  justify-center items-center gap-3">
                  <h2
                    className={clsx(
                      "text-center text-2xl font-bold transform transition duration-500"
                    )}
                  >
                    Winner&apos;s Name :
                  </h2>
                  <h2
                    className={clsx(
                      "text-center text-2xl font-bold transform transition duration-500 py-1 px-3 rounded-md",
                      {
                        ["scale-150 border-yellow-500 border border-solid mb-1"]:
                          selected,
                      }
                    )}
                  >
                    {activeIndex > -1 ? `${users[activeIndex].fullName}` : ""}
                  </h2>
                  <Button
                    className="w-full"
                    disabled={isDrawing}
                    onClick={animateNames}
                  >
                    {isDrawing
                      ? "Drawing"
                      : selected
                      ? "Restart draw"
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
