import { db } from "@/lib/db"

export const getCustomersFn = async () => {
    const response = await db.query.customer.findMany()
    return response
}