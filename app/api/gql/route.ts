import AxiosClient from "@/lib/configs/axios/client";
import { BACKEND_BASE } from "@/lib/constants";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const client = new AxiosClient<unknown, unknown>({
            baseURL: BACKEND_BASE,
            gqlQuery: (formData.get("gqlQuery") as string) || "",
        });

        const data = await client.gql();

        return Response.json(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return Response.json({});
    }
}
