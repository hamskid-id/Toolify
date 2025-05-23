'use client'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export const InputField = ({
  control,
  name,
  labelStyle,
  label,
  inputCategory,
  inputType,
  readOnly = false,
  autoFocus = false,
  value,
  handleValueChange,
  inputStyle,
  hideTopBorder = false,
  placeholder,
  selectList,
  radioList,
}) => {
  const inputCnStyle = cn(
    `md:text-md text-md font-[400] border border-grey-400 shadow-none h-[50px] rounded-sm flex items-center`,
    inputStyle,
    hideTopBorder && 'border-t-0 border-x-0 shadow-none px-0 focus-visible:border-t-0 focus-visible:border-x-0 focus-visible:ring-0'
  )

  const inputLabelStyle = cn(`text-[14px] font-[500]`, labelStyle)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className={inputLabelStyle}>{label}</FormLabel>}
          {inputCategory === 'input' && (
            <FormControl>
              {handleValueChange ? (
                <Input
                  defaultValue={value}
                  readOnly={readOnly}
                  autoFocus={autoFocus}
                  type={inputType || 'text'}
                  className={inputCnStyle}
                  placeholder={placeholder && placeholder}
                  onChange={handleValueChange}
                />
              ) : inputType === 'number' ? (
                <Input
                  readOnly={readOnly}
                  autoFocus={autoFocus}
                  type={inputType || 'text'}
                  className={inputCnStyle}
                  min={1}
                  placeholder={placeholder}
                  {...field}
                />
              ) : (
                <Input
                  autoFocus={autoFocus}
                  readOnly={readOnly}
                  type={inputType || 'text'}
                  className={inputCnStyle}
                  placeholder={placeholder}
                  {...field}
                />
              )}
            </FormControl>
          )}
          {inputCategory === 'textArea' && (
            <FormControl>
              <Textarea
                readOnly={readOnly}
                className={inputCnStyle}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
          )}
          {inputCategory === 'radio' && radioList && (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex space-x-4 flex-wrap'
            >
              {radioList?.map((radio, index) => (
                <FormItem
                  className='flex items-center space-x-3 space-y-0 mt-4'
                  key={index}
                >
                  <FormControl>
                    <RadioGroupItem value={radio.value} />
                  </FormControl>
                  <FormLabel className='font-normal'>{radio.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          )}
          {inputCategory === 'select' && (
            <div className='relative'>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={readOnly}
              >
                <FormControl>
                  <SelectTrigger className={inputCnStyle}>
                    <SelectValue
                      placeholder={placeholder}
                      className='flex items-center text-[11.04px] font-[400]'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectList !== undefined &&
                    selectList?.map((item, index) => (
                      <SelectItem value={item.value} key={index}>
                        {item.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
