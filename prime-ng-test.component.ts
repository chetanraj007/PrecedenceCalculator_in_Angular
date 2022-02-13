import { Component, OnInit } from '@angular/core';
import { CalcService } from '../Service/calc.service';


@Component({
  selector: 'app-prime-ng-test',
  templateUrl: './prime-ng-test.component.html',
  styleUrls: ['./prime-ng-test.component.scss']
})
export class PrimeNgTestComponent implements OnInit {


  calcData: any;
  showResultFlag: boolean=false;
  expression:any;

  constructor(private calcService:CalcService)
  {
    this.calcData = {};
    this.calcData.calcInput = '';
    this.showResultFlag = false;
  }

  ngOnInit(): void {
  }

  addOperation(operation: any) {
    const input = this.calcData.calcInput;
    const finalInput = input.concat(operation);
    this.calcData.calcInput = finalInput;

  }

  clearInput() {
    this.calcData.calcInput = '';
    this.showResultFlag = false;

  }

  public res:any;
  divindex:any;
  mulindex:any;
  subindex:any;
  prevValue:any;
  mulPrevValue:any;
  subPrevValue:any;
  showResult()
   {

    this.calcData.result = this.CalculateInfix(this.calcData.calcInput);
    this.showResultFlag = true;
  }



  CalculateInfix(expression:any)
    {

      let tokens = expression.split('');

      // Stack for numbers: 'values'
     let values: any[] = [];

     // Stack for Operators: 'ops'
     let ops:any[] = [];

     for (let i = 0; i < tokens.length; i++)
     {
          // Current token is a whitespace, skip it
         if (tokens[i] == ' ')
         {
             continue;
         }

         // Current token is a number,
         // push it to stack for numbers
         if (tokens[i] >= '0' && tokens[i] <= '9')
         {
             let sbuf = "";

             // There may be more than one digits in number

             while (i < tokens.length && tokens[i] >= '0' &&tokens[i] <= '9')
             {
                 sbuf = sbuf + tokens[i++];
             }
             values.push(parseInt(sbuf, 10));

             // Right now the i points to
             // the character next to the digit,
             // since the for loop also increases
             // the i, we would skip one
             //  token position; we need to
             // decrease the value of i by 1 to
             // correct the offset.
               i--;
         }

         // Current token is an opening
         // brace, push it to 'ops'
         else if (tokens[i] == '(')
         {
             ops.push(tokens[i]);
         }

         // Closing brace encountered,
         // solve entire brace
         else if (tokens[i] == ')')
         {
             while (ops[ops.length - 1] != '(')
             {
               values.push(this.applyOp(ops.pop(),values.pop(),values.pop()));
             }
             ops.pop();
         }

         // Current token is an operator.
         else if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == '*' || tokens[i] == '/')
         {

             // While top of 'ops' has same
             // or greater precedence to current
             // token, which is an operator.
             // Apply operator on top of 'ops'
             // to top two elements in values stack
             while (ops.length > 0 && this.hasPrecedence(tokens[i],ops[ops.length - 1]))
             {
               values.push(this.applyOp(ops.pop(),values.pop(),values.pop()));
             }

             // Push current token to 'ops'.
             ops.push(tokens[i]);
         }
     }

     // Entire expression has been
     // parsed at this point, apply remaining
     // ops to remaining values
     while (ops.length > 0)
     {
         values.push(this.applyOp(ops.pop(), values.pop(),values.pop()));
     }

     // Top of 'values' contains
     // result, return it
     return values.pop();
 }

 // Returns true if 'op2' has
 // higher or same precedence as 'op1',
 // otherwise returns false.
  hasPrecedence(op1:any, op2:any)
 {
     if (op2 == '(' || op2 == ')')
     {
         return false;
     }
     if ((op1 == '*' || op1 == '/') &&(op2 == '+' || op2 == '-'))
     {
         return false;
     }
     else
     {
         return true;
     }
 }

 // A utility method to apply an
 // operator 'op' on operands 'a'
 // and 'b'. Return the result.
 applyOp(op:any, b:any, a:any)
 {
     switch (op)
     {
     case '+':
         return a + b;
     case '-':
         return a - b;
     case '*':
         return a * b;
     case '/':
         if (b == 0)
         {
             document.write("Cannot divide by zero");
         }
         return a/b;
     }
    }

}



//------------------------------------
// if(result.includes("/"))
// {
//   var index=result.indexOf('/'); 4+6
//   var denominator=result.slice(index+1).toString();
//   var numerator=result.slice(index-1,index).toString();
//   this.res=numerator/denominator;
// }
// if(result.includes("*"))
// {
//   var index=result.indexOf('*');
//   var a=result.slice(index+1).toString();
//   var b=result.slice(index-1,index).toString();
//   this.res=b*this.res;

// }
// if(result.includes("-"))
// {
//   var index=result.indexOf('-');
//   var a=result.slice(index+1).toString();
//   var b=result.slice(index-1,index).toString();

//   if(this.res>b)
//   {
//     this.res=b-this.res;

//   }
//   else
//   {
//     this.res=this.res-a;

//   }

// }
// if(result.includes("+"))
// {
//   var index=result.indexOf('+');
//   var a=result.slice(index+1).toString();
//   var b=result.slice(index-1,index).toString();
//   if(this.res>b)
//   {
//     this.res=this.res-(-b);
//   }
//   else
//   {
//     this.res=a-(-this.res);
//   }

// }



//=--------------------------------------



// var key=this.calcData.calcInput;
// if (key === '/' || key === 'x' || key === '-' || key === '+') {
//  const lastKey = this.mainDisplayText[this.mainDisplayText.length - 1];
//  if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
//    this.operatorSet = true;
//  }
//  if ((this.operatorSet) || (this.mainDisplayText === '')) {
//    return;
//  }
//  this.operand1 = parseFloat(this.mainDisplayText);

//  this.operator = key;
//  this.operatorSet = true;
// }
// if (this.mainDisplayText.length === 10) {
//  return;
// }
// this.mainDisplayText += key;

// this.calculationString = this.mainDisplayText;
// this.operand2 = parseFloat(this.mainDisplayText.split(this.operator)[1]);
// if (this.operator === '/') {
//  this.subDisplayText = this.mainDisplayText;
//  this.mainDisplayText = (this.operand1 / this.operand2).toString();
//  this.subDisplayText = this.calculationString;
//  if (this.mainDisplayText.length > 9) {
//    this.mainDisplayText = this.mainDisplayText.substr(0, 9);
//  }
// } else if (this.operator === 'x') {
//  this.subDisplayText = this.mainDisplayText;
//  this.mainDisplayText = (this.operand1 * this.operand2).toString();
//  this.subDisplayText = this.calculationString;
//  if (this.mainDisplayText.length > 9) {
//    this.mainDisplayText = 'ERROR';
//    this.subDisplayText = 'Range Exceeded';
//  }
// } else if (this.operator === '-') {
//  this.subDisplayText = this.mainDisplayText;
//  this.mainDisplayText = (this.operand1 - this.operand2).toString();
//  this.subDisplayText = this.calculationString;
// } else if (this.operator === '+') {
//  this.subDisplayText = this.mainDisplayText;
//  this.mainDisplayText = (this.operand1 + this.operand2).toString();
//  this.subDisplayText = this.calculationString;
//  if (this.mainDisplayText.length > 9) {
//    this.mainDisplayText = 'ERROR';
//    this.subDisplayText = 'Range Exceeded';
//  }
// } else {
//  this.subDisplayText = 'ERROR: Invalid Operation';
// }
// this.answered = true;



//-------------------------------------------------

//var length=result.length;
    //  for(let i=0;i<length;i++)
    //  {
    //    if(result[i]=="/")
    //    {
    //          this.divindex=i;
    //          var denominator=parseFloat(result.slice(this.divindex+1));
    //          var numerator=parseFloat(result.slice(this.divindex-1));
    //          this.res=numerator/denominator;
    //          this.prevValue=this.res


    //    }
    //   if(result[i]=="*")
    //    {
    //     this.mulindex=i;
    //      var op1=parseFloat(result.slice(this.mulindex+1));//front value
    //      var op2=parseFloat(result.slice(this.mulindex-1));//back value
    //      if(this.divindex<this.mulindex)
    //      {
    //       this.res=op1*this.prevValue;
    //       this.mulPrevValue=this.res;
    //      }
    //      else if(this.divindex>this.mulindex)
    //      {
    //        this.res=this.prevValue*op2;
    //      }
    //      else
    //      {
    //        this.res=op1*op2;
    //      }

    //    }
    //    if(result[i]=="-")
    //    {
    //      this.subindex=i;
    //      var op1=parseFloat(result.slice(this.subindex+1));//front value
    //      var op2=parseFloat(result.slice(this.subindex-1));//back value
    //      if(this.divindex<this.subindex && this.mulindex<this.subindex)
    //      {
    //       this.res=op1-this.mulPrevValue;
    //      }
    //      else
    //      {
    //       this.res=op2-op1;
    //      }

    //    }
    //    if(result[i]=="+")
    //    {
    //      var addindex=i;
    //      var op1=parseFloat(result.slice(addindex+1));//front value
    //      var op2=parseFloat(result.slice(addindex-1));//back value
    //      if(this.divindex<addindex && this.mulindex<addindex)
    //      {
    //       this.res=op1+this.subPrevValue;
    //      }
    //      else
    //      {
    //       this.res=op2+op1;
    //      }

    //    }
    //  }
    //  alert(this.res)
