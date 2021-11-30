import React from 'react';
import {getParsedMessage} from './index';
describe("ui utils", () => {
    describe("getParsedMessage", () => {
        test("return test as array separated by space", () => {
            const text = "this is my profile https://www.linkedin.com/in/meharaj"
            const result = getParsedMessage(text);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(5)
        })
        test("should return url in text as hyper link", () => {
            const text = "this is my profile https://www.linkedin.com/in/meharaj"
            const result = getParsedMessage(text);
            const a = result[4]
            expect(React.isValidElement(a)).toBe(true);
        });
        test("should return email in text as email hyper link", () => {
            const text = "reach me out at <meharaj137@gmail.com>"
            const result = getParsedMessage(text);
            const a = result[4]
            expect(a.props.href).toContain('mailto');
        });        

    })
})