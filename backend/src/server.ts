import Fastify from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import cors from '@fastify/cors'
import type { MultipartFile } from '@fastify/multipart'
import { toJson } from '@/services/toJson'
import { getMonthlyRecurringRevenue } from '@/services/monthly-recurring-revenue'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    files: 1,
  }
})

await fastify.register(cors, {
  origin: ["http://localhost:5173"]
})

fastify.post<{ Body: { file: MultipartFile } }>('/upload', async function handler(request, reply) {

  const file = request.body.file

  try {
    const data = await toJson(file)

    const kpi = getMonthlyRecurringRevenue(data)

    return {
      kpi
    }
  } catch {
    return reply.code(400).send({
      "statusCode": 400,
      "error": "Bad Request",
      "message": "Invalid file"
    });
  }
})

const start = async () => {
  try {

    await fastify.listen({ port: 3000, host: "0.0.0.0" })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()