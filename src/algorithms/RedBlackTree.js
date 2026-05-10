class Node {

  constructor(key, data, label) {

    this.key = key
    this.data = data
    this.label = label

    this.color = "RED"

    this.left = null
    this.right = null
  }
}

export default class RedBlackTree {

  constructor() {

    this.root = null
    this.latestInserted = null
    this.nodeCounter = 1
  }

  generateLabel() {

    const label = `N${this.nodeCounter}`
    this.nodeCounter++

    return label
  }

  insert(key, data) {

    const label = this.generateLabel()

    const newNode = new Node(
      key,
      data,
      label
    )

    // ROOT INSERTION
    if (!this.root) {

      newNode.color = "BLACK"
      this.root = newNode
      this.latestInserted = newNode.label

      return
    }

    this.insertNode(this.root, newNode)
    this.latestInserted = newNode.label
  }

  insertNode(root, newNode) {

    if (newNode.key < root.key) {

      if (!root.left) {

        // Alternate colors visually
        newNode.color =
          root.color === "RED"
            ? "BLACK"
            : "RED"

        root.left = newNode

      } else {

        this.insertNode(root.left, newNode)
      }

    } else {

      if (!root.right) {

        newNode.color =
          root.color === "RED"
            ? "BLACK"
            : "RED"

        root.right = newNode

      } else {

        this.insertNode(root.right, newNode)
      }
    }
  }

  search(key) {

    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {

    if (!node) return null

    if (key === node.key) {

      return node
    }

    if (key < node.key) {

      return this.searchNode(node.left, key)
    }

    return this.searchNode(node.right, key)
  }

  inorder(node = this.root, result = []) {

    if (!node) return result

    this.inorder(node.left, result)

    result.push({
      key: node.key,
      label: node.label,
      color: node.color,
      data: node.data
    })

    this.inorder(node.right, result)

    return result
  }

  getHeight(node = this.root) {

    if (!node) return 0

    return Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    ) + 1
  }

  countNodes(node = this.root) {

    if (!node) return 0

    return (
      1 +
      this.countNodes(node.left) +
      this.countNodes(node.right)
    )
  }
}