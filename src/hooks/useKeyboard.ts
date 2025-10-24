import { atom, useAtom } from "jotai"
import { useEffect } from "react"


const keysAtom = atom<{ [key: string]: boolean }>({})

let initialized = false;

export function useKeyboard() {
  const [keys, setKeys] = useAtom(keysAtom)
  useEffect(() => {
    if (initialized) {
      return
    }
    initialized = true;

    function keydownHandler(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      setKeys(dict => ({ ...dict, [key]: true }))
    }

    function keyupHandler(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      setKeys(dict => ({ ...dict, [key]: false }))
    }

    function blurHandler() {
      setKeys({});
    }

    document.addEventListener("keydown", keydownHandler)
    document.addEventListener("keyup", keyupHandler)
    window.addEventListener("blur", blurHandler)

    return () => {
      document.removeEventListener("keydown", keydownHandler)
      document.removeEventListener("keyup", keyupHandler)
      window.removeEventListener("blur", blurHandler)
    }
  }, [])

  return keys
}
