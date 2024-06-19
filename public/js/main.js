// JavaScript para la interactividad de los huecos de patrocinadores
// document.addEventListener('DOMContentLoaded', function () {
//     // Agregar eventos de click y doble click para los huecos de patrocinadores
//     const sponsorSlots = document.querySelectorAll('.sponsor-slot');
//     sponsorSlots.forEach(slot => {
//         slot.addEventListener('dblclick', () => {
//             const newName = prompt('Enter new sponsor name:');
//             if (newName) {
//                 const id = slot.getAttribute('data-id');
//                 fetch(`/update-position/${id}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ name: newName })
//                 }).then(response => response.json())
//                     .then(data => {
//                         if (data.success) {
//                             slot.innerHTML = newName;
//                         }
//                     });
//             }
//         });
//     });

//     const priceLegend = document.querySelectorAll('.price-legend');
//     priceLegend.forEach(item => {
//         item.addEventListener('dblclick', () => {
//             const newPrice = prompt('Enter new price:');
//             if (newPrice) {
//                 const price = item.getAttribute('data-price');
//                 fetch(`/update-price/${price}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ price: newPrice })
//                 }).then(response => response.json())
//                     .then(data => {
//                         if (data.success) {
//                             document.querySelectorAll(`.price-legend[data-price="${price}"]`).forEach(el => {
//                                 el.innerHTML = el.innerHTML.replace(/\$\d+/, `$${newPrice}`);
//                                 el.setAttribute('data-price', newPrice);
//                             });
//                         }
//                     });
//             }
//         });
//     });
// });





//   

// $(document).ready(function() {
//     $('#mapa-moto-lat').maphilight({
//         fill: true,
//         fillColor: 'ffffff',
//         fillOpacity: 0.5,
//         stroke: false,
//         fade: true,
//         alwaysOn: false, // Inicialmente no resaltar ninguna área
//         // Agrega más opciones según necesites
//     });
// });


$(document).ready(function () {
    // $('#latmap area').on('dblclick', function () {
    //     var id = $(this).data('id');
    //     var position_name = $(this).data('position_name');
    //     var section = $(this).data('section');
    //     console.log(section);
    //     var newText = prompt('Enter new text for ' + id + ' ' + position_name + ' ' + section + ':');
    //     if (newText) {
    //         $(this).text(newText);
    //         // Aquí podrías hacer una llamada AJAX para actualizar el texto en la base de datos si es necesario
    //     }
    // });






    /* Funciones para los colores del mapa de la moto lateral */
    // Inicializa MapHilight Moto Lateral
    $('#mapa-moto-lat').maphilight({
        fillColor: 'ffffff', // Color de relleno base para todas las áreas
        fillOpacity: 0, // Sin opacidad base (se aplicará según las clases)
        strokeColor: '000000',
        strokeWidth: 2,
        alwaysOn: true
    });

    // Inicialza MapHilight Moto Frontal
    $('#mapa-moto-front').maphilight({
        fillColor: 'ffffff', // Color de relleno base para todas las áreas
        fillOpacity: 0, // Sin opacidad base (se aplicará según las clases)
        strokeColor: '000000',
        strokeWidth: 2,
        alwaysOn: true
    });

    // Configura los colores y efectos hover para cada clase
    $('area[data-section="1"]').each(function () {
        $(this).data('maphilight', {
            fillColor: 'ffc832f2', 
            fillOpacity: 0.4,
            strokeColor: '9cff1d',
            strokeWidth: 2
        });
    });

    $('area[data-section="2"]').each(function () {
        $(this).data('maphilight', {
            fillColor: '4327a2ff', 
            fillOpacity: 0.4,
            strokeColor: '9cff1d',
            strokeWidth: 2
        });
    });

    $('area[data-section="3"]').each(function () {
        $(this).data('maphilight', {
            fillColor: 'fff6a8ff', 
            fillOpacity: 0.4,
            strokeColor: '9cff1d',
            strokeWidth: 2
        });
    });

    $('area[data-section="4"]').each(function () {
        $(this).data('maphilight', {
            fillColor: 'ff7800ff', 
            fillOpacity: 0.4,
            strokeColor: '9cff1d',
            strokeWidth: 2
        });
    });

    $('area[data-section="5"]').each(function () {
        $(this).data('maphilight', {
            fillColor: '00ac49ff', 
            fillOpacity: 0.4,
            strokeColor: '9cff1d',
            strokeWidth: 2
        });
    });

    $('area[data-section="6"]').each(function () {
        $(this).data('maphilight', {
            fillColor: '00a8ddff', 
            fillOpacity: 0.4,
            strokeColor: '9cff1d',
            strokeWidth: 2
        });
    });

    // Reaplica MapHilight después de configurar los datos
    $('#mapa-moto-lat').maphilight();
    $('#mapa-moto-front').maphilight();






    // // Para que se ajusten los textos en responsive
    // function updateTextPositions() {
    //     var $image = $('#mapa-moto-lat');
    //     var originalWidth = $image[0].naturalWidth; // Ancho original de la imagen
    //     var currentWidth = $image.width(); // Ancho actual de la imagen

    //     $('.texto-sponsor').each(function() {
    //         var $texto = $(this);
    //         var originalLeft = $texto.data('left');
    //         var originalTop = $texto.data('top');

    //         // Calcular nuevas posiciones proporcionales
    //         var newLeft = (originalLeft / originalWidth) * currentWidth;
    //         var newTop = (originalTop / originalWidth) * currentWidth; // Suponemos que la relación de aspecto se mantiene

    //         $texto.css({
    //             left: newLeft + 'px',
    //             top: newTop + 'px'
    //         });
    //     });
    // }

    // updateTextPositions(); // Actualizar posiciones al cargar la página

    // $(window).resize(updateTextPositions); // Actualizar posiciones al redimensionar la ventana
});



/**
 * Funcionalidades con Base de Datos
 */

$(document).ready(function () {
    let currentArea = null;

    $('#latmap area').on('dblclick', function () {
        currentArea = $(this);
        currentText = $(this).siblings('.texto-sponsor');
        var id = $(this).data('id');
        var position_name = $(this).data('position_name');
        var section = $(this).data('section');
        console.log(section);
        $('#sponsorModal').modal('show');
    });

    $('#frontmap area').on('dblclick', function () {
        currentArea = $(this);
        currentText = $(this).siblings('.texto-sponsor');
        var id = $(this).data('id');
        var position_name = $(this).data('position_name');
        var section = $(this).data('section');
        console.log(section);
        $('#sponsorModal').modal('show');
    });

    $('#saveSponsor').on('click', function () {
        var sponsorId = $('#sponsorSelect').val();
        var sponsorName = $('#sponsorSelect option:selected').text();
        if (currentArea) {
            // Actualiza el texto del área con el nombre del patrocinador
            currentArea.text(sponsorName);

            // Aquí puedes hacer una llamada AJAX para actualizar el patrocinador en la base de datos
            $.ajax({
                url: '/update-position-sponsor',
                method: 'POST',
                data: {
                    id: currentArea.data('id'),
                    sponsor_id: sponsorId
                },
                success: function (response) {
                    console.log('Patrocinador actualizado');
                    // // Actualiza el texto del área con el nombre del patrocinador
                    // currentArea.data('sponsor', );
                    currentText.text(sponsorName.trim())
                    // // Muestra el nombre del patrocinador en el área (podría ser en una etiqueta, tooltip, etc.)
                    // currentArea.attr('title', sponsorName);  // ejemplo para tooltip
                    // console.log(currentText.text());
                },
                error: function (error) {
                    console.error('Error al actualizar el patrocinador', error);
                }
            });

            // Cierra el modal
            $('#sponsorModal').modal('hide');
        }
    });

    // Manejador para añadir un nuevo patrocinador
    $('#add-sponsor').on('click', function () {
        createSponsor($('#new-sponsor-name').val());
    });

    $('#new-sponsor-name').on('keypress', function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            createSponsor($('#new-sponsor-name').val());
            // $('input[name = butAssignProd]').click();
            return false;
        }
    });

    function createSponsor(name) {
        if (name.trim() !== '') {
            $.ajax({
                url: '/add-sponsor',
                method: 'POST',
                data: { name: name },
                success: function (response) {
                    // Recargar la página para reflejar los cambios o actualizar la tabla dinámicamente
                    location.reload();
                },
                error: function (error) {
                    console.error('Error al añadir el patrocinador', error);
                }
            });
        } else {
            alert('Por favor, ingrese un nombre para el nuevo patrocinador.');
        }
    }

    $('#removeSponsor').on('click', function () {
        var sponsorId = $('#sponsorSelect').val();
        var sponsorName = $('#sponsorSelect option:selected').text();
        if (currentArea) {
            // Actualiza el texto del área con el nombre del patrocinador
            currentArea.text(sponsorName);

            // Aquí puedes hacer una llamada AJAX para actualizar el patrocinador en la base de datos
            $.ajax({
                url: '/remove-position-sponsor',
                method: 'POST',
                data: {
                    id: currentArea.data('id'),
                },
                success: function (response) {
                    console.log('Patrocinador eliminado');
                    currentText.text('')

                },
                error: function (error) {
                    console.error('Error al eliminar el patrocinador', error);
                }
            });

            // Cierra el modal
            $('#sponsorModal').modal('hide');
        }
    });
});
