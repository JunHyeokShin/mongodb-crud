import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextResponse } from 'next/server'

export async function POST(requst) {
  const { title, description } = await requst.json()
  await connectMongoDB()
  await Topic.create({ title, description })
  return NextResponse.json({ message: 'Topic created!' }, { status: 201 })
}

export async function GET() {
  await connectMongoDB()
  const topics = await Topic.find() // find()는 해당 컬렉션의 모든 레코드들을 반환함
  return NextResponse.json({ topics })
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Topic.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Topic deleted!' }, { status: 200 })
}
