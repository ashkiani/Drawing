//Siavash 1/31/2020

var createConnection = function (sourcePort, targetPort) {

  var conn = new draw2d.Connection({
    router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
    stroke: 2,
    color: "#00a8f0",
    radius: 20,
    outlineColor: "#30ff30",
    source: sourcePort,
    target: targetPort
  });

  // since version 3.5.6
  //
  conn.on("dragEnter", function (emitter, event) {
    conn.attr({
      outlineStroke: 2
    });
  });
  conn.on("dragLeave", function (emitter, event) {
    conn.attr({
      outlineStroke: 0
    });
  });

  return conn;

};

var canvas = null;
document.addEventListener("DOMContentLoaded", function () {

  // Everything is loaded - core and application. Now can create the
  // application
  //

  canvas = new draw2d.Canvas("gfx_holder");

  // Install a special policy into the canvas to use my own implementation of connection
  // if we drag&drop a port
  //
  canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
    createConnection: createConnection
  }));

  // This is the key!! The interceptor allows that a figure is droppable to a
  // connection
  //
  canvas.installEditPolicy(new MyInterceptorPolicy());

});

$(function () {


  let initialPos = 100;
  console.log("ready!");
  shapes = [];
  $("#btnCenter").click(function () {
    let shape = new draw2d.shape.node.Between({ width: 80, height: 40, x: initialPos++, y: initialPos++, bgColor: "lightgreen", resizeable: true });
    // shape.add(new draw2d.shape.basic.Label({ text: "Some text" }), new draw2d.layout.locator.CenterLocator(this));
    canvas.add(shape);
    shapes.push(shape);
  });
  $("#btnField").click(function () {
    let shape = new draw2d.shape.node.Between({ width: 80, height: 40, x: initialPos++, y: initialPos++, bgColor: "orange", resizeable: true });
    canvas.add(shape);
    shapes.push(shape);

  });
  $("#btnVehicle").click(function () {
    let shape = new draw2d.shape.node.Between({ width: 80, height: 40, x: initialPos++, y: initialPos++, bgColor: "lightblue", resizeable: true });
    canvas.add(shape);
    shapes.push(shape);

  });
  $("#btnUpdate").click(function () {
    let selection = canvas.getSelection();
    if (selection != null && selection.getSize() > 0) {
      $("#exampleModal").modal('show');
    }
    else {
      alert("No shape is selected.");
    }

  });
  $("#btnOk").click(function () {
    let selection = canvas.getSelection();
    if (selection != null) {
      selection.each(function (number, value) {
        if (value.children.data.length == 0) {
          value.add(new draw2d.shape.basic.Label({ text: $("#txtName").val() }), new draw2d.layout.locator.CenterLocator(this));
        }
        else {
          value.children.data[0].figure.text = $("#txtName").val();
          value.children.data = [value.children.data[0]];
          value.setWidth(value.getWidth() + 1);

        }
      });
      $("#exampleModal").modal('hide');
    }
  });

  $("form").submit(function (e) {
    e.preventDefault();
  });

  $('#exampleModal').on('show.bs.modal', function () {
    $("#txtName").val("");
    $("#txtDescription").val("");
  })
  // show.bs.modal
  //
  // this.html.on("dblclick", function (event) {
  // $("#btnConnect").click(function () {
  //     for(let i=0;i<shapes.length-1;i++){
  //         canvas1.add(createConnection(shapes[i].getInputPort(0),shapes[i+1].getHybridPort(2)));
  //     }
  //     // 
  // });


});
