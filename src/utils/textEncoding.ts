// src/utils/textEncoding.ts

const MOJIBAKE_REPLACEMENTS: Array<[string, string]> = [
  ["ÃƒÂ¡", "Ã¡"],
  ["ÃƒÂ©", "Ã©"],
  ["ÃƒÂ­", "Ã­"],
  ["ÃƒÂ³", "Ã³"],
  ["ÃƒÂº", "Ãº"],
  ["ÃƒÂ±", "Ã±"],
  ["ÃƒÂ¼", "Ã¼"],
  ["ÃƒÂ", "Ã"],
  ["Ãƒâ€°", "Ã‰"],
  ["ÃƒÂ", "Ã"],
  ["Ãƒâ€œ", "Ã“"],
  ["ÃƒÅ¡", "Ãš"],
  ["Ãƒâ€˜", "Ã‘"],
  ["ÃƒÅ“", "Ãœ"],
  ["Ã‚Â¿", "Â¿"],
  ["Ã‚Â¡", "Â¡"],
  ["Ã‚Âº", "Âº"],
  ["Ã‚Âª", "Âª"],
  ["Ã‚Â·", "Â·"],
  ["Ã¢â‚¬â€œ", "â€“"],
  ["Ã¢â‚¬â€", "â€”"],
  ["Ã¢â‚¬Ëœ", "â€˜"],
  ["Ã¢â‚¬â„¢", "â€™"],
  ["Ã¢â‚¬Å“", "â€œ"],
  ["Ã¢â‚¬Â", "â€"],
];

export function decodeMojibakeText(value: string): string {
  let decoded = value;

  for (const [bad, good] of MOJIBAKE_REPLACEMENTS) {
    decoded = decoded.split(bad).join(good);
  }

  return decoded;
}

export function decodeMaybeMojibake(value: unknown): string {
  return decodeMojibakeText(String(value ?? ""));
}
