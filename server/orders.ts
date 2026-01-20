'use server'
import { db } from "@/lib/db"
import { InsertOrder, order } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const createOrderFn = async (values: InsertOrder) => {
    try {
        await db.insert(order).values(values)
        return { success: true, message: "Order created successfully" };
    } catch {
        return { success: false, message: "Failed to create order" };
    }
}

export const getOrdersFn = async () => {
    const response = await db.query.order.findMany({
        columns: {
            id: true,
            orderNumber: true,
            amount: true,
            priority: true,
            createdAt: true
        }, with: {
            material: {
                columns: {
                    id: true,
                    number: true,
                    description: true,
                    qty: true,
                    createdAt: true,
                }
            },
            customer: {
                columns: {
                    name: true
                }
            },
        },
        orderBy: (order, { desc }) => [desc(order.createdAt)]
    })

    return response
}

export const getOrderByIdFn = async (orderId: string) => {
    try {
        const response = await db.query.order.findFirst({
            where: eq(order.id, orderId),
            columns: {
                id: true,
                orderNumber: true,
                amount: true,
                createdAt: true,
            },
            with: {
                customer: {
                    columns: {
                        id: true,
                        name: true
                    }
                },
                material: {
                    columns: {
                        id: true,
                        number: true,
                        description: true,
                        qty: true,
                        status: true,
                        createdAt: true,
                    }
                },
            }
        })
        return { success: true, response }
    } catch {
        return { success: false, message: "Failed to get order" }
    }
}

export const deleteOrderFn = async (orderId: string) => {
    await db.delete(order).where(eq(order.id, orderId))

    return { success: true, message: "Order deleted successfuly" }
}