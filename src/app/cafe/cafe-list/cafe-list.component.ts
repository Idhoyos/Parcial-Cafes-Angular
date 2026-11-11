import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css']
})
export class CafeListComponent implements OnInit {
  cafes: Array<Cafe> = [];
  totalCafeOrigen: number = 0;
  totalCafeBlend: number = 0;

  constructor(
    private cafeService: CafeService,
    private cdr: ChangeDetectorRef
  ) {}

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
      this.calcularTotales();
      this.cdr.detectChanges();
    });
  }

  calcularTotales(): void {
    this.totalCafeOrigen = this.cafes.filter((c) =>
      c.tipo.toLowerCase().includes('origen')
    ).length;
    this.totalCafeBlend = this.cafes.filter((c) =>
      c.tipo.toLowerCase().includes('blend')
    ).length;
  }

  ngOnInit(): void {
    this.getCafes();
  }
}
