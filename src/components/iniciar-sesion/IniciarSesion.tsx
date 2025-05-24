import { FormIniciarSesion } from "./FormIniciarSesion";
import Logo from "../logo/Logo";
import Loading from "../loading/Loading";

export default function IniciarSesion() {
  return (
    <>
      {false && <Loading />}
      <div className="grid min-h-svh">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <FormIniciarSesion />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
