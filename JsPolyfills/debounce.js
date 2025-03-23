function debounce(func, delay, options = { leading: false, trailing: true }) {
    let timeoutId;
    let executed = false;
  
    return function(...args) {
      const { leading, trailing } = options;
      const context = this;
  
      if (leading && !executed) {
        func.apply(context, args);
        executed = true;
      }
  
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        if (trailing) {
          func.apply(context, args);
        }
        timeoutId = null;
        executed = false; // Reset for leading edge
      }, delay);
    };
  }
  
  // Example usage:
  function handleInput(value) {
    console.log('Debounced input:', value);
  }
  
  const debouncedInput = debounce(handleInput, 300, { leading: true, trailing: true });
  
  // Simulating input events:
  debouncedInput('a'); // Executes immediately (leading edge)
  setTimeout(() => debouncedInput('ab'), 100);
  setTimeout(() => debouncedInput('abc'), 200);
  setTimeout(() => debouncedInput('abcd'), 400); // Executes after 300ms delay (trailing edge)
  
  // Example usage with only trailing
  const debouncedTrailing = debounce(handleInput, 300, {leading: false, trailing: true});
  debouncedTrailing('a');
  setTimeout(() => debouncedTrailing('ab'), 100);
  setTimeout(() => debouncedTrailing('abc'), 200);
  setTimeout(() => debouncedTrailing('abcd'), 400); // Executes after 300ms delay (trailing edge)
  
  //Example usage with only leading
  const debouncedLeading = debounce(handleInput, 300, {leading: true, trailing: false});
  debouncedLeading('a'); // Executes immediately (leading edge)
  setTimeout(() => debouncedLeading('ab'), 100);
  setTimeout(() => debouncedLeading('abc'), 200);
  setTimeout(() => debouncedLeading('abcd'), 400); // does not execute again.