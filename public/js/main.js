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
async function fetchSections() {
    const response = await fetch('/api/sections');
    const sections = await response.json();
    return sections;
}

//  Función para inicializar los colores y efectos de hover
async function initMapHilight() {
    const sections = await fetchSections();

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

    // Configura los colores para cada clase
    sections.forEach(section => {
        $('area[data-section="' + section.id + '"]').each(function () {
            $(this).data('maphilight', {
                fillColor: section.color,
                fillOpacity: 1,
                strokeColor: '000000',
                strokeWidth: 2,
                alwaysOn: true
            });
        });
    });

    // Aplica MapHilight después de configurar los datos
    $('#mapa-moto-lat').maphilight();
    $('#mapa-moto-front').maphilight();

    // Configura los efectos de hover
    $('area').hover(
        function () {
            // Almacena los datos originales
            var original = $(this).data('maphilight');
            $(this).data('original-maphilight', original);

            // Aplica el color de hover
            var hover = $.extend({}, original, {
                fillColor: '9cff1d',
                fillOpacity: 1
            });
            $(this).data('maphilight', hover).trigger('alwaysOn.maphilight');
        },
        function () {
            // Restaura los datos originales
            var original = $(this).data('original-maphilight');
            $(this).data('maphilight', original).trigger('alwaysOn.maphilight');
        }
    );
}


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

    initMapHilight();
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
        // console.log(section);
        $('#sponsorModal').modal('show');
    });

    $('#frontmap area').on('dblclick', function () {
        currentArea = $(this);
        currentText = $(this).siblings('.texto-sponsor');
        var id = $(this).data('id');
        var position_name = $(this).data('position_name');
        var section = $(this).data('section');
        // console.log(section);
        $('#sponsorModal').modal('show');
    });

    $('#saveSponsor').on('click', function () {
        var sponsorId = $('#sponsorSelect').val();
        var sponsorName = $('#sponsorSelect option:selected').text();

        // Función para realizar la llamada AJAX
        function updateSponsor(area) {
            $.ajax({
                url: '/update-position-sponsor',
                method: 'POST',
                data: {
                    id: area.data('id'),
                    sponsor_id: sponsorId
                },
                success: function (response) {
                    console.log('Patrocinador actualizado');
                    area.text(sponsorName);
                    location.reload();

                },
                error: function (error) {
                    console.error('Error al actualizar el patrocinador', error);
                }
            });
        }

        if (currentArea) {
            updateSponsor(currentArea);
        } else {
            const sectionId = $(this).data('section-id');
            const hasChilds = $(this).data('childs');
            const parentId = $(this).data('parent-id');

            if (sectionId) {
                if (hasChilds) {
                    // Si la sección tiene hijos, actualiza todos los hijos
                    $('area[data-id="' + parentId + '"],area[data-parent-id="' + parentId + '"]').each(function () {
                        updateSponsor($(this));
                        location.reload();
                    });
                } else {
                    // Si la sección no tiene hijos, actualiza toda la sección
                    $('area[data-section="' + sectionId + '"]').each(function () {
                        updateSponsor($(this));
                        location.reload();
                    });
                }
            }
        }
        // Recarga la página para reflejar los cambios
        location.reload();

        // Cierra el modal
        $('#sponsorModal').modal('hide');

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
        // Función para realizar la llamada AJAX de eliminación
        function removeSponsor(area) {
            $.ajax({
                url: '/remove-position-sponsor',
                method: 'POST',
                data: {
                    id: area.data('id'),
                },
                success: function (response) {
                    // console.log('Patrocinador eliminado');
                    area.text(''); // Limpiar el texto del área si se elimina el patrocinador
                    location.reload(); // Recargar la página para reflejar los cambios
                },
                error: function (error) {
                    console.error('Error al eliminar el patrocinador', error);
                }
            });
        }

        if (currentArea) {
            removeSponsor(currentArea);
        } else {
            const sectionId = $(this).data('section-id');
            const hasChilds = $(this).data('childs');
            const parentId = $(this).data('parent-id');

            if (sectionId) {
                if (hasChilds) {
                    $('area[data-id="' + parentId + '"],area[data-parent-id="' + parentId + '"]').each(function () {
                        removeSponsor($(this));
                    });
                } else {
                    $('area[data-section="' + sectionId + '"]').each(function () {
                        removeSponsor($(this));
                    });
                }

            }
        }
        // Recargar la página para reflejar los cambios
        location.reload();

        // Cierra el modal
        $('#sponsorModal').modal('hide');
    });
});
