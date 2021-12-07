namespace Liszt.Quiz.Prompts
{
   public class Notation : Prompt 
   {
     public override string Type { get => "notation"; }
     /// <value>The ABC string to parse into standard notation.</value>
     public string ABCString { get; set; }
   }
}