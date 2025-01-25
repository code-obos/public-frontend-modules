export function replaceIfMatch(
  input: string,
  regex: RegExp,
  replacerPattern: string,
): string {
  const normalizedInput = cleanInput(input);

  return normalizedInput.replace(regex, replacerPattern);
}

export function cleanInput(input: string): string {
  // We're extremely lenient when attemtping to format the input.
  // We remove everything that isn't a letter or a number, that way we can get rid of any
  // formatting that might already be present in the input, eg spaces, hyphens or dots
  return input.replace(/[^a-zA-Z0-9]/g, '');
}
