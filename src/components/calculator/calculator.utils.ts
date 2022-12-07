import recipeFile from "../../assets/recipes";
let recipe = [...recipeFile];

export function findItem(name: string): any | false {
  return recipe.find((e) => e.name === name) || false;
}

export function getIngredients(name: string): any[] | false {
  return findItem(name)?.ingredients || false;
}

export function getRecipe(name: string, quantity: number): any {
  let item = { ...findItem(name) };
  // console.log(name, quantity, item);

  let craftAmount = Math.ceil(quantity / item.perCraft);

  if (!item) {
    return false;
  }

  if (!item.ingredients) {
    return item;
  }

  item.ingredients = item.ingredients.map((e: any) => {
    return {
      name: e.name,
      quantity: e.quantity * craftAmount,
    };
  });

  return { ...item };
}

export function logLine(level: number, line: string) {
  return "  ".repeat(level) + "| " + line;
}

export function getRecipeTree(startItemName: string, quantity: number) {
  let tree = getRecipe(startItemName, quantity);
  tree.quantity = quantity;
  let current = tree;
  let stack: any[] = [];

  //while current or stack exists
  while (current || stack.length > 0) {
    if (current && current.ingredients) {
      current.ingredients = current.ingredients.map((e: any) => {
        // console.log(e);
        // console.log(recipe);
        let item = getRecipe(e.name, e.quantity);
        // console.log(item);
        if (item) {
          item.quantity = e.quantity;
          return item;
        } else {
          return e;
        }
      });
      //console.log(current);

      stack.push(...current.ingredients);
    }

    current = stack.pop();
  }

  return tree;
}

export function naryTreeTraversal(
  startItemName: string,
  startQuantity: number
) {
  let tree = getRecipeTree(startItemName, startQuantity);
  const startLevel = 0;

  let result: any[] = [];

  let currentNode = {
    data: { ...tree },
    level: startLevel,
  };
  let stack: any[] = [];

  while (currentNode) {
    console.log(
      `${"     ".repeat(currentNode.level)}${currentNode.data.name} x${
        currentNode.data.quantity
      }`
    );

    result.push({
      level: currentNode.level,
      name: currentNode.data.name,
      quantity: currentNode.data.quantity,
    });

    if (currentNode.data.ingredients) {
      currentNode.data.ingredients.forEach((element: any) => {
        stack.push({ data: element, level: currentNode.level + 1 });
      });
    }

    currentNode = stack.pop();
  }
  console.log(result);
  return [...result];
}
