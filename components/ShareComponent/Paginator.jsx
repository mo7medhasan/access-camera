"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

// type Props = {
//   paginagtionOptions: {
//     totalPages: number;
//     limit: number;
//   };
// };

export default function Paginator({ paginagtionOptions }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const setPageinateReuslt = (pageNumber) => {
    params.set("page", `${pageNumber}`);
    params.set("limit", `${paginagtionOptions.limit}`);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Suspense>
      <Pagination className="my-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${
                Number(params.get("page")) > 1
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } `}
              onClick={() => {
                if (Number(params.get("page")) > 1) {
                  setPageinateReuslt(eval(`${params.get("page")} - 1`));
                }
              }}
            />
          </PaginationItem>
          {[...Array(paginagtionOptions?.totalPages)].map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                className={`border p-4 cursor-pointer rounded ${
                  params.get("page") === String(idx + 1) ||
                  (!params.get("page") && idx === 0)
                    ? "border-main"
                    : undefined
                } `}
                onClick={() => {
                  params.delete("search");
                  setPageinateReuslt(idx + 1);
                }}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={`${
                Number(params.get("page")) < paginagtionOptions.totalPages
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } `}
              onClick={() => {
                if (!params.get("page")) {
                  setPageinateReuslt(1);
                }
                if (
                  Number(params.get("page")) < paginagtionOptions.totalPages
                ) {
                  setPageinateReuslt(eval(`${params.get("page")} + 1`));
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Suspense>
  );
}
