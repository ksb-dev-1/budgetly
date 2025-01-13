import { Expense } from "@prisma/client";

// db
import { prisma } from "~/db/prisma.server";

export async function getExpenses(userID: string): Promise<Expense[]> {
  if (!userID) throw new Error("Login to get expenses!");

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: userID },
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    throw new Error("Failed to get expenses.");
  }
}

export async function getExpense(id: string): Promise<Expense | null> {
  try {
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error("Failed to get expense.");
  }
}

export async function addExpense(
  expenseData: {
    title: string;
    amount: number; // amount is now a number
    date: Date; // date is now a Date object
  },
  userID: string
): Promise<Expense> {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: expenseData.amount, // No need to parse again
        date: expenseData.date, // No need to convert again
        User: { connect: { id: userID } },
      },
    });
  } catch (error) {
    console.error("Error in addExpense:", error);
    throw new Error("Failed to add expense.");
  }
}

export async function updateExpense(
  id: string,
  expenseData: { title: string; amount: string; date: string }
): Promise<void> {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error("Failed to update expense.");
  }
}

export async function deleteExpense(id: string): Promise<void> {
  try {
    await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete expense.");
  }
}
