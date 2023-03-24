import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PaymentComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PaymentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mfe'`, () => {
    const fixture = TestBed.createComponent(PaymentComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mfe');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PaymentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'mfe app is running!'
    );
  });
});
