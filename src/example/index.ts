import { SerialPort } from 'serialport'
import { toPacket } from '..'

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const main = async (portName: string) => {
  const port = new SerialPort({ baudRate: 9600, path: portName })
  let error: Error | null = null
  port.open((err) => (error = err))
  if (error) return console.error(error)

  // Press A
  port.write(toPacket({ buttons: ['A'] }))
  await wait(500)

  // Release
  port.write(toPacket({}))
  await wait(500)

  // Press B and RClick and Right
  port.write(toPacket({ buttons: ['A'], specialButtons: ['RClick'], hat: '__R_' }))
  await wait(500)

  // Release
  port.write(toPacket({}))
  await wait(500)
}

if (!process.argv[2]) {
  console.error('missing port name')
} else {
  main(process.argv[2])
}
