import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CafeListComponent } from '../cafe-list.component';
import { CafeService } from '../../cafe.service';
import { Cafe } from '../../cafe';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CafeListComponent],
      providers: [CafeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 3; i++) {
      const cafe = new Cafe(
        i + 1,
        faker.word.words(3),
        i % 2 === 0 ? 'Café de Origen' : 'Blend',
        faker.location.city(),
        faker.word.words(2),
        faker.number.int({ min: 1000, max: 2000 }),
        faker.image.url()
      );
      component.cafes.push(cafe);
    }

    component.calcularTotales();
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create table with 3 rows plus header', () => {
    const headerRows = debug.queryAll(By.css('thead tr'));
    expect(headerRows).toHaveSize(1);

    const bodyRows = debug.queryAll(By.css('tbody tr'));
    expect(bodyRows).toHaveSize(3);

    const allRows = debug.queryAll(By.css('tr'));
    expect(allRows).toHaveSize(4);
  });

  it('should display the correct coffee data in the table', () => {
    const rows = debug.queryAll(By.css('tbody tr'));
    rows.forEach((row, index) => {
      expect(row.nativeElement.textContent).toContain(component.cafes[index].nombre);
      expect(row.nativeElement.textContent).toContain(component.cafes[index].tipo);
      expect(row.nativeElement.textContent).toContain(component.cafes[index].region);
    });
  });

  it('should calculate the totals for coffee types correctly', () => {
    expect(component.totalCafeOrigen).toBe(2);
    expect(component.totalCafeBlend).toBe(1);

    const paragraphs = debug.queryAll(By.css('div.mt-3 p'));
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].nativeElement.textContent).toContain('Total café de origen: 2');
    expect(paragraphs[1].nativeElement.textContent).toContain('Total café blend: 1');
  });
});
