*** Test Cases ***
Loop as long as condition is True
    WHILE    ${x} > 0
        Log    ${x}
        ${x} =    Evaluate    ${x} - 1
    END
    
Limit as iteration count
    WHILE    True    limit=100
        Log    This is run 100 times.
    END

Limit as time
    WHILE    True    limit=10 seconds
        Log    This is run 10 seconds.
    END

No limit
    WHILE    True    limit=NONE
        Log    This must be forcefully stopped.
    END