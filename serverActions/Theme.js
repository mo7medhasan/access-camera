'use server'
import { cookies } from 'next/headers'

export async function resetTheme(data) {
  cookies().set('theme', data)}