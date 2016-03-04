/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('parseCommandline', () => {
        function assertParseResult(commandLine: string[], expectedParsedCommandLine: ts.ParsedCommandLine) {
            const parsed = ts.parseCommandLine(commandLine);
            const parsedErrors = parsed.errors;
            const expectedErrors = expectedParsedCommandLine.errors;

            assert.equal(JSON.stringify(parsed.options), JSON.stringify(expectedParsedCommandLine.options));
            assert.isTrue(parsedErrors.length === expectedErrors.length);

            for (let i = 0; i < parsedErrors.length; ++i) {
                assert.equal(parsedErrors[i].code, expectedParsedCommandLine[i].code);
                assert.equal(parsedErrors[i].category, expectedParsedCommandLine[i].category);
            }
        }

        it("Parse correct form of library option ", () => {
            assertParseResult(["--library", "es5"],
                {
                    errors: [],
                    fileNames: [],
                    options: {
                        library: ["lib.es5.d.ts"]
                    }
                });
        });
    });
}
