$(document).ready(function () {
    let selectedColor = '#FF5733';
    let selectedColorBackground = null;
    selectColor(selectedColor);
});

 // Botón para dibujar forma libre
 document.getElementById('addFreeDrawButton').addEventListener('click', () => {
     // Utiliza la herramienta de dibujo libre de Fabric.js
     canvas.isDrawingMode = true;
     canvas.freeDrawingBrush.width = 2;
     canvas.freeDrawingBrush.color = selectedColor;
 });

 // Evento para detener el modo de dibujo libre al hacer clic en otro botón o en el lienzo
 canvas.on('mouse:up', () => {
     if (canvas.isDrawingMode) {
         canvas.isDrawingMode = false;
         let paths = canvas.getObjects().filter(obj => obj.type === 'path');
         let ultimoPath = paths.reduce((ultimo, actual) => {
             return (canvas.getObjects().indexOf(actual) > canvas.getObjects().indexOf(ultimo)) ? actual : ultimo;
         });
         if (ultimoPath) {
             ultimoPath.set({
                 selectable: true,
                 hasControls: true,
                 centeredRotation: true,
                 fill: selectedColorBackground,
             });
             // console.log(`Forma libre agregada. Puntos:`, ultimoPath.path);
         }
     } 
 });


 function addShape(shapeType) {
     let shape;
     switch (shapeType) {
         case 'line':
             shape = new fabric.Line([50, 100, 200, 200], {
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'oval':
             shape = new fabric.Ellipse({
                 left: 100,
                 top: 100,
                 rx: 50,
                 ry: 30,
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'rect':
             shape = new fabric.Rect({
                 left: 100,
                 top: 100,
                 fill: selectedColorBackground,
                 width: 150,
                 height: 100,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'triangle':
             shape = new fabric.Triangle({
                 left: 100,
                 top: 100,
                 fill: selectedColorBackground,
                 width: 100,
                 height: 100,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'diamond':
             shape = new fabric.Polygon([
                 { x: 200, y: 10 },
                 { x: 250, y: 50 },
                 { x: 200, y: 90 },
                 { x: 150, y: 50 }
             ], {
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'pentagon':
             shape = new fabric.Polygon([
                 { x: 300, y: 10 },
                 { x: 350, y: 50 },
                 { x: 325, y: 100 },
                 { x: 275, y: 100 },
                 { x: 250, y: 50 }
             ], {
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'hexagon':
             shape = new fabric.Polygon([
                 { x: 300, y: 50 },
                 { x: 350, y: 50 },
                 { x: 375, y: 100 },
                 { x: 350, y: 150 },
                 { x: 300, y: 150 },
                 { x: 275, y: 100 }
             ], {
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'star':
             shape = new fabric.Polygon([
                 { x: 50, y: 0 },
                 { x: 60, y: 30 },
                 { x: 100, y: 30 },
                 { x: 70, y: 50 },
                 { x: 80, y: 80 },
                 { x: 50, y: 60 },
                 { x: 20, y: 80 },
                 { x: 30, y: 50 },
                 { x: 0, y: 30 },
                 { x: 40, y: 30 }
             ], {
                 left: 100,
                 top: 100,
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'arrow':
             shape = new fabric.Polygon([
                 { x: 0, y: 0 },
                 { x: 100, y: 50 },
                 { x: 0, y: 100 },
                 { x: 20, y: 50 }
             ], {
                 left: 100,
                 top: 100,
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
         case 'speechBubble':
             shape = new fabric.Path('M 0 0 L 200 0 Q 230 0, 230 30 L 230 70 Q 230 100, 200 100 L 100 100 L 50 130 L 75 100 L 0 100 Q -30 100, -30 70 L -30 30 Q -30 0, 0 0 z', {
                 left: 100,
                 top: 100,
                 fill: selectedColorBackground,
                 stroke: selectedColor,
                 strokeWidth: 2
             });
             break;
     }

     // Añadir un evento para mostrar las coordenadas del área cuando se deselecciona
     shape.on('deselected', () => {
         // Almacenar detalles del rectángulo para recrear
         console.log(`Forma deseleccionada. Nueva ubicación: Left=${shape.left}, Top=${shape.top}`);
     });
     canvas.add(shape);
 }

 // document.getElementById('addLineButton').addEventListener('click', () => addShape('line'));
 document.getElementById('addOvalButton').addEventListener('click', () => addShape('oval'));
 document.getElementById('addRectButton').addEventListener('click', () => addShape('rect'));
 document.getElementById('addTriangleButton').addEventListener('click', () => addShape('triangle'));
 document.getElementById('addDiamondButton').addEventListener('click', () => addShape('diamond'));
 document.getElementById('addPentagonButton').addEventListener('click', () => addShape('pentagon'));
 document.getElementById('addHexagonButton').addEventListener('click', () => addShape('hexagon'));
 document.getElementById('addStarButton').addEventListener('click', () => addShape('star'));
 document.getElementById('addArrowButton').addEventListener('click', () => addShape('arrow'));
 document.getElementById('addSpeechBubbleButton').addEventListener('click', () => addShape('speechBubble'));


 // Evento para eliminar un objeto al presionar la tecla "Delete"
 document.addEventListener('keydown', (e) => {
     if (e.key === 'Delete') {
         const activeObject = canvas.getActiveObject();
         if (activeObject) {
             canvas.remove(activeObject);
         }
     }
 });

 const highlightRectanglesButton = document.getElementById('highlightRectanglesButton');
 highlightRectanglesButton.addEventListener('click', () => {
     const rects = canvas.getObjects().filter(obj => obj.type === 'rect');
     rects.forEach(rect => {
         rect.set('fill', 'lime');
     });
     canvas.renderAll();
 });

 const originalColor = 'rgba(0,0,0,0)'; // Define el color original para desmarcar

 // Botón para desmarcar todos los rectángulos
 const unhighlightRectanglesButton = document.getElementById('unhighlightRectanglesButton');
 unhighlightRectanglesButton.addEventListener('click', () => {
     const rects = canvas.getObjects().filter(obj => obj.type === 'rect');
     rects.forEach(rect => {
         rect.set('fill', originalColor);
     });
     canvas.renderAll();
 });