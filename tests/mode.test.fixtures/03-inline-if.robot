*** Keyword ***
Normal IF
    IF    $condition1
        Keyword    argument
    END
    IF    $condition2
        RETURN
    END

Inline IF
    IF    $condition1    Keyword    argument
    IF    $condition2    RETURN

*** Test Cases ***
Inline IF/ELSE
    IF    $condition     Keyword    argument    ELSE    Another Keyword
    Log   1

Inline IF/ELSE IF/ELSE
    IF    $cond1    Keyword 1     ELSE IF    $cond2    Keyword 2   ELSE IF    $cond3    Keyword 3    ELSE    Keyword 4
    Log   2

*** Keyword ***
Inline IF/ELSE with assignment
    ${var} =    IF    $condition   Keyword    argument    ELSE    Another Keyword
    Log    3

Inline IF/ELSE with assignment having multiple variables
    ${host}    ${port} =    IF    $production    Get Production Config    ELSE    Get Testing Config   fooo
    Log    4