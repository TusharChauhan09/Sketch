"use client";
import {
  IconUserFilled,
  IconKeyFilled,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";
import { useState } from "react";

type AuthTemplateProps = {
  isSignIn: boolean;
};

export default function AuthTemplate({ isSignIn }: AuthTemplateProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center py-2 bg-neutral-950 text-neutral-100">
      <div className="w-85 h-95 border-2 rounded-xl border-neutral-600 p-[3px]">
        <div className="w-full h-full border rounded-lg border-neutral-700 p-10 flex flex-col justify-center items-center">
          {isSignIn ? (
            <h1 className="text-4xl mb-8 font-bold ">Sign In</h1>
          ) : (
            <h1 className="text-4xl mb-8 font-bold">Sign Up</h1>
          )}
          <form className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center ">
              <IconUserFilled />
              <input
                type="email"
                placeholder="Email"
                className="p-2 w-full rounded-md bg-neutral-800 border border-neutral-600 focus:outline-none focus:border-neutral-400"
              />
            </div>
            <div className="flex gap-4 items-center  ">
              <IconKeyFilled />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="p-2 w-full rounded-md bg-neutral-800 border border-neutral-600 focus:outline-none focus:border-neutral-400 pr-10" // add padding-right
                />
                {showPassword ? (
                  <IconEye
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <IconEyeClosed
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="border-2 rounded-xl border-neutral-700 p-[3px] hover:cursor-pointer">
              <button
              onClick={()=>{}}
                type="submit"
                className="p-2 w-full bg-neutral-500 rounded-md hover:bg-neutral-600 transition hover:cursor-pointer"
              >
                {" "}
                {isSignIn ? "Sign In" : "Sign Up"}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
