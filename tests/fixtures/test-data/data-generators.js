//Generate unique username up to max 20 chars
export function generateUsername(prefix = "je") {
  const MAX_LENGTH = 20;
  const timestamp = Date.now().toString();

  let username;
  let timestampPart;
  const availableLength = MAX_LENGTH - prefix.length;

  if (availableLength <= 0) {
    const trimmedPrefix = prefix.slice(0, MAX_LENGTH - 2);
    timestampPart = timestamp.slice(-2);
    username = trimmedPrefix + timestampPart;
  } else {
    timestampPart = timestamp.slice(-availableLength);
    username = prefix + timestampPart;
  }

  return username;
}

//Generate unique test email up to max 20 chars
export function generateEmail(prefix = "je") {
  const MAX_LENGTH = 20;
  const emailSuffix = "@example.com";
  const timestamp = Date.now().toString();

  let email;
  let timestampPart;
  const availableLength = MAX_LENGTH - (prefix + emailSuffix).length;

  if (availableLength <= 0) {
    const trimLength = MAX_LENGTH - emailSuffix.length - 2;
    const trimmedPrefix = prefix.slice(0, trimLength);
    timestampPart = timestamp.slice(-2);
    email = trimmedPrefix + timestampPart + emailSuffix;
  } else {
    timestampPart = timestamp.slice(-availableLength);
    email = prefix + timestampPart + emailSuffix;
  }

  return email;
}

//Generate a bithday for age=18
export function generateAdultDate() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split("T")[0];
}

//Generate custom age
export function generateCustomDate(years) {
  const today = new Date();
  today.setFullYear(today.getFullYear() + years);
  return today.toISOString().split("T")[0];
}
