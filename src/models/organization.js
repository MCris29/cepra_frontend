export class Organization {
    constructor(
        itorg_ruc, 
        itorg_nombre, 
        itorg_sector, 
        itorg_subsector, 
        itorg_num_empleados, 
        itorg_ubicacion,
        itorg_provincia,
        itorg_ciudad
    ) {
        this.itorg_ruc = itorg_ruc;
        this.itorg_nombre = itorg_nombre;
        this.itorg_sector = itorg_sector;
        this.itorg_subsector= itorg_subsector;
        this.itorg_num_empleados = itorg_num_empleados;
        this.itorg_ubicacion = itorg_ubicacion;
        this.itorg_provincia = itorg_provincia;
        this.itorg_ciudad = itorg_ciudad;
    }
}