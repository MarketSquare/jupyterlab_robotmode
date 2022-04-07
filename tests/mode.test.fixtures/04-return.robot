*** Keywords ***
Return at the end
    Some Keyword
    ${result} =    Another Keyword
    RETURN    ${result}

Return conditionally
    IF    ${condition}
        RETURN    Something
    ELSE
        RETURN    Something else
    END

Early return
    IF    ${not applicable}    RETURN
    Some Keyword
    Another Keyword