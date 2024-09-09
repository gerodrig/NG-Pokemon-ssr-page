import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: '<h1>Hello Benito</h1>',
  })
  class NavbarComponentMock{}

  beforeEach(async () => {
    await TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    })
    // ! RECOMMENDED
      // await TestBed.configureTestingModule({
      //   imports: [AppComponent],
      //   providers: [provideRouter([])],
      // })
      //   .overrideComponent(AppComponent, {
      //     add: {
      //       imports: [NavbarComponentMock],
      //     },
      //     remove: {
      //       imports: [NavbarComponent],
      //     },
      //   })
      //   .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
  });



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy
    
  });
  

  // it(`should have the 'pokemon-ssr' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('pokemon-ssr');
  // });

  // it('should render title on title page', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
