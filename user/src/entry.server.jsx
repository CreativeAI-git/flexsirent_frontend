import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  loadContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const stream = new PassThrough();

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter
        context={routerContext}
        url={request.url}
      />,
      {
        onShellReady() {
          shellRendered = true;
          const body = createReadableStreamFromReadable(stream);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(body, {
              status: responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    pipe(stream);
    setTimeout(abort, 5000);
  });
}
