import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  
})
export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  ngOnInit(){
    //cargar todos los productos
    this.obtenerProductos();
  }
  
  private obtenerProductos(){
    //consumir los datos del observable
    this.productoServicio.obtenerProductosLista().subscribe(datos =>{
      this.productos = datos;
    })
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    );
  }
}
