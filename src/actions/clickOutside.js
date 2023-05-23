
export function clickOutside(node) {
  console.log("clickOutside. HTMLDivElement: " + node);
  addEventListener("click", handleClick);

  function handleClick(e) {
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  }
  return {
    destroy() {
      console.log("clickOutside: destroyed!");
      removeEventListener("click", handleClick);
    }
  }
}