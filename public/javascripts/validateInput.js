function validateInput(input) {
  const { email, firstName, lastName, dob, work, home } = input;

  // Validate email
  if (!email) {
    return { error: "Email is required" };
  }
  //  Validate Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email format" };
  }

  // Validate firstName
  if (!firstName) {
    return { error: "First name is required" };
  }

  // Validate lastName
  if (!lastName) {
    return { error: "Last name is required" };
  }

  // Validate dob format
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches "YYYY-MM-DD"
  if (!dobRegex.test(dob)) {
    return { error: "Invalid date of birth format. Use 'YYYY-MM-DD'." };
  }

  // Validate work
  if (!work) {
    return { error: "Work is required" };
  }

  // Validate home
  if (!home) {
    return { error: "Home is required" };
  }

  return null;
}

module.exports = validateInput;
