const ToggleButton =  (cell) => {
    const row = cell.getRow();
    const rowData = row.getData();
    const isParent = row.getTreeChildren && row.getTreeChildren().length > 0;

    const container = document.createElement("div");
    container.classList.add("task-cell-content");

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-cell-text");
    textSpan.textContent = cell.getValue() || "";

    if (isParent) {
        const toggleButton = document.createElement("button");
        toggleButton.setAttribute("type", "button");
        toggleButton.classList.add("custom-tree-toggle");
        toggleButton.title = "Toggle Children";

        if (row.isTreeExpanded()) {
            toggleButton.classList.add("expanded");
        } else {
            toggleButton.classList.add("collapsed");
        }

        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            row.treeToggle();
        });

        container.appendChild(toggleButton);
    }

    container.appendChild(textSpan);

    return container;
};