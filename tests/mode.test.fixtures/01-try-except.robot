*** Test Cases ***
First example
    TRY
        Some Keyword
    EXCEPT    Error message
        Error Handler Keyword
    END
    Keyword Outside

Capture error
    TRY
        Some Keyword
    EXCEPT    GLOB: ValueError: *    AS   ${error}
        Error Handler 1    ${error}
    EXCEPT    REGEXP: [Ee]rror \\d+    GLOB: ${pattern}    AS    ${error}
        Error Handler 2    ${error}
    EXCEPT    AS    ${error}
        Error Handler 3    ${error}
    END

TRY/EXCEPT/ELSE/FINALLY
    TRY
        Some keyword
    EXCEPT
        Log    Error occurred!
    ELSE
        Log    No error occurred.
    FINALLY
        Log    Always executed.
    END

Glob pattern
    TRY
        Some Keyword
    EXCEPT    ValueError: *    type=GLOB
        Error Handler 1
    EXCEPT    [Ee]rror ?? occurred    ${pattern}    type=glob
        Error Handler 2
    END

Regular expression
    TRY
        Some Keyword
    EXCEPT    ValueError: .*    type=${regexp}
        Error Handler 1
    EXCEPT    [Ee]rror \\d+ occurred    type=Regexp    # Backslash needs to be escaped.
        Error Handler 2
    END

Match start
    TRY
        Some Keyword
    EXCEPT    ValueError:    ${beginning}    type=start
        Error Handler
    END

Explicit exact match
    TRY
        Some Keyword
    EXCEPT    ValueError: invalid literal for int() with base 10: 'ooops'    type=LITERAL
        Error Handler
    EXCEPT    Error 13 occurred    type=LITERAL
        Error Handler 2
    END
