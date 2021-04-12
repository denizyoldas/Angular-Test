import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Increment yapıldığında value değerinin 1 olması ve sonrasında Decrement yapıldığında value değerinin 0 olması

  it('should increment/decrement value', () => {
    fixture.componentInstance.increment();
    expect(fixture.componentInstance.value).toEqual(1);
    fixture.componentInstance.decrement();
    expect(fixture.componentInstance.value).toEqual(0);
  });

  // Başlangıçta Increment yapıldığında HTML’de h1 tag’inin içerisinde 1 olması

  it('should increment in HTML', () => {
    debugElement.query(By.css('button.increment')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const value = debugElement.query(By.css('h1')).nativeElement.innerText;
    expect(value).toEqual('1');
  });

  // Increment sonrası Decrement yapıldığında HTML’de h1 tag’inin içerisinde 0 olması

  it('should decrement in HTML', () => {
    debugElement.query(By.css('button.decrement')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const value = debugElement.query(By.css('h1')).nativeElement.innerText;
    expect(value).toEqual('0');
  });

  // value değeri 0 iken Decrement işlemi yapıldığında minimum uyarı mesajının verilmesi

  it('should stop at 0 and show minimum message', () => {
    debugElement
      .query(By.css('button.decrement'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();
    const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(fixture.componentInstance.value).toEqual(0);
    expect(message).toContain('Minimum');
  });

  // value değeri 15 iken Increment işlemi yapıldığında maximum uyarı mesajının verilmesi

  it('should stop at 15 and show maximum message', () => {
    fixture.componentInstance.value = 15;
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();
    const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(fixture.componentInstance.value).toEqual(15);
    expect(message).toContain('Maximum');
  });
});
