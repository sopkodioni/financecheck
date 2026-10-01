import { useRef } from "react"
import Input from "./Input"

interface CodeInputProps{
  codeList: string[],
  setCodeList: (newCode: string[]) => void
}

const CodeInput = ({ codeList, setCodeList }: CodeInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if(value && index < 3){
      inputRefs.current[index + 1]?.focus()
    }

    const newCodeList = [...codeList]
    newCodeList[index] = value
    setCodeList(newCodeList)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text').trim()
    const splitCode = pastedText.slice(0,4).split('')
    
    if(splitCode.length > 0){
      const newCodeList = [...codeList]

      splitCode.forEach((digit, index) => {
        newCodeList[index] = digit
      })

      setCodeList(newCodeList)

      const nextIndex = Math.min(splitCode.length - 1, 3)
      inputRefs.current[nextIndex].focus()
    }
  } 

  const handleClear = (index:number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Backspace"){
      if(!codeList[index] && index > 0){
        inputRefs.current[index-1]?.focus()
      }
    }
  }

  return (
      <div className="flex" onPaste={handlePaste}>
        <Input 
          maxLength={1} 
          value={codeList[0]} 
          onChange={(e) => handleChange(0, e.target.value)}
          onKeyDown={(e) => handleClear(0, e)}
          placeholder="*"
          ref={(el) => { inputRefs.current[0] = el }} 
        />  
        <Input 
          maxLength={1} 
          value={codeList[1]} 
          onChange={(e) => handleChange(1, e.target.value)}
          onKeyDown={(e) => handleClear(1, e)}
          placeholder="*"
          ref={(el) => { inputRefs.current[1] = el }} 
        />  
        <Input 
          maxLength={1} 
          value={codeList[2]} 
          onChange={(e) => handleChange(2, e.target.value)}
          onKeyDown={(e) => handleClear(2, e)}
          placeholder="*"
          ref={(el) => { inputRefs.current[2] = el }} 
        />  
        <Input 
          maxLength={1} 
          value={codeList[3]} 
          onChange={(e) => handleChange(3, e.target.value)}
          onKeyDown={(e) => handleClear(3, e)}
          placeholder="*"
          ref={(el) => { inputRefs.current[3] = el }} 
        />  
      </div>
  )
}

export default CodeInput