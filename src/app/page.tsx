"use client";
import FullScreenLoader from "@/components/FullScreenLoader";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import useForm from "@/Features/useForm";
import clsx from "clsx";
const formId = "BofwoAql";
export default function Home() {
  const {
    form,
    users,
    activeIndex,
    syncForm,
    isLoading,
    endDraw,
    isDrawing,
    startDraw,
  } = useForm(formId);
  const image = form?.theme.background.href;
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
        className={clsx(`h-screen w-screen`)}
        containerClassName="flex-col items-center justify-center"
      >
        <div className="flex flex-col w-full text-center  justify-center items-center  gap-5 text-white">
          {form ? (
            <>
              <h1 className="text-4xl font-bold ">
                Lucky Draw for&nbsp;{form.title}
              </h1>
              {users.length ? (
                <div className="w-2/3 flex flex-col text-center  justify-center items-center gap-2">
                  <h2 className="text-center text-2xl font-bold ">
                    Winner&apos;s Name :{" "}
                    {activeIndex > -1
                      ? `${users[activeIndex].firstName} ${users[activeIndex].lastName} `
                      : ""}
                  </h2>
                  {isDrawing ? (
                    <Button className="w-full" onClick={endDraw}>
                      End draw
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={startDraw}>
                      Start draw
                    </Button>
                  )}
                </div>
              ) : null}
            </>
          ) : null}
          <Button
            variant="outline"
            onClick={syncForm}
            size="sm"
            className="text-black"
          >
            Sync Form
          </Button>
        </div>
      </Section>
    </>
  );
}
