const BUTTONS = {
  Y: 0x01,
  B: 0x02,
  A: 0x04,
  X: 0x08,
  L: 0x10,
  R: 0x20,
  ZL: 0x40,
  ZR: 0x80,
}
const SPECIAL_BUTTONS = {
  MINUS: 0x01,
  PLUS: 0x02,
  LClick: 0x04,
  RClick: 0x08,
  Home: 0x10,
  Capture: 0x20,
}
const HAT = {
  U___: 0,
  U_R_: 1,
  __R_: 2,
  __RD: 3,
  ___D: 4,
  _L_D: 5,
  _L__: 6,
  UL__: 7,
  ____: 8,
}

export type NormalButton = keyof typeof BUTTONS
export type SpecialButton = keyof typeof SPECIAL_BUTTONS
export type Hat = keyof typeof HAT

export type NXInputState = {
  buttons?: NormalButton[]
  specialButtons?: SpecialButton[]
  hat?: Hat
  leftPad?: [x: number, y: number]
  rightPad?: [x: number, y: number]
}

export const toPacket = ({
  buttons = [],
  specialButtons = [],
  hat = '____',
  leftPad = [0x80, 0x80],
  rightPad = [0x80, 0x80],
}: NXInputState): Uint8Array => {
  const b1 = buttons.map((b) => BUTTONS[b]).reduce((p, c) => p | c, 0)
  const b2 = specialButtons.map((b) => SPECIAL_BUTTONS[b]).reduce((p, c) => p | c, 0)
  const [lx, ly] = leftPad
  const [rx, ry] = rightPad

  return Uint8Array.from([0xab, b1, b2, HAT[hat], lx & 0xff, ly & 0xff, rx & 0xff, ry & 0xff, 0, 0, 0])
}
