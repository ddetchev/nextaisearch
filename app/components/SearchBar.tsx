'use client';

import { useState, useEffect } from "react";
import { useCompletion } from "ai/react";

export default function SearchBar() {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const { complete, completion, isLoading, error } = useCompletion({
        api: '/api/search',
    })


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log(`The submitted query is: ${query}`)
        complete(query)
      }

    return (


        <div>

<form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 text-slate-700">

              {isLoading && (
                <div className="animate-spin relative flex w-5 h-5 ml-2">
                  <p>It's loading!</p>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                  </span>
                  <span className="text-slate-700 dark:text-slate-100">
                    Sad news, the search has failed! Please try again.
                  </span>
                </div>
              )}

              {completion && !error ? (
                <div className="flex items-center gap-4 dark:text-white">
                  <span className="bg-green-500 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                  </span>
                  <h3 className="font-semibold">Answer:</h3>
                  {completion}
                </div>
              ) : null}

              <div className="relative">
                <input
                  placeholder="Ask a question..."
                  name="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    console.log(`The query is currently: ${query}`)
                }}
                  className="col-span-3"
                />
                
              </div>
              
            </div>

            <button type="submit">Ask</button>

              {/* <Button type="submit" className="bg-red-500">
                Ask
              </Button> */}
          </form>

        </div>

    )

}