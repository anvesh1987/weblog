/* ==========================================================================
   JavaBot Widget — floating popup chatbot for Java/OOP topics
   USAGE: Add this one line before </body> on any page of your site:
     <script src="javabot-widget.js"></script>
   That's it — a floating chat button appears in the bottom-right corner.
   ========================================================================== */
(function(){

/* ---------- Knowledge base ---------- */
const KB = [
{keywords:["hello","hi","hey"], reply:"Hi! I'm JavaBot. Ask me about any Java/OOP topic — e.g. 'inheritance', 'exception handling', 'collections', 'streams', 'jdbc', 'swing'."},
{keywords:["need for oop","why oop","oop paradigm"], reply:"OOP manages growing software complexity by bundling data and behavior into objects, giving:\n• Modularity\n• Reusability (via inheritance)\n• Maintainability (encapsulation limits ripple effects)\n• Natural modeling of real-world entities"},
{keywords:["oop concepts","pillars of oop","four pillars","principles of oop"], reply:"Core OOP concepts:\n1. Encapsulation — bundling data + methods, hiding internal state\n2. Abstraction — exposing essential features, hiding detail\n3. Inheritance — reusing/extending behavior via hierarchy\n4. Polymorphism — one interface, many forms (overloading & overriding)"},
{keywords:["abstraction"], reply:"Abstraction hides implementation detail, exposing only what's needed.\nabstract class Shape {\n  abstract double area();\n}\nclass Circle extends Shape {\n  double r;\n  double area(){ return 3.14*r*r; }\n}"},
{keywords:["coping with complexity"], reply:"Complexity is managed via Abstraction (ignore irrelevant detail), Decomposition (break into modules/classes), and Hierarchy (organize abstractions) — all directly supported by OOP."},
{keywords:["history of java","java history","who created java"], reply:"James Gosling and team at Sun Microsystems started Java in 1991 as 'Oak', renamed Java in 1995. Designed to be platform-independent via the JVM and bytecode. Oracle acquired Sun in 2010."},
{keywords:["java buzzwords","features of java"], reply:"Java buzzwords: Simple, Object-Oriented, Robust, Secure, Architecture-neutral, Portable, Multithreaded, Interpreted, High performance, Distributed, Dynamic."},
{keywords:["data types","primitive types"], reply:"8 primitives: byte, short, int, long (integers); float, double (floating point); char (Unicode character); boolean. Plus reference types: classes, arrays, interfaces."},
{keywords:["variables"], reply:"Variable = named memory location. Local (in a method, no default value), instance (per object, has default value), static (shared across all objects)."},
{keywords:["scope","lifetime of variables"], reply:"Local variables: scope = their block; lifetime = until block exits.\nInstance variables: scope = class; lifetime = object's life.\nStatic variables: scope = class; lifetime = whole program."},
{keywords:["arrays"], reply:"int[] arr = new int[5];\nint[] nums = {1,2,3,4,5};\nint len = nums.length;\nArrays are objects, indexed from 0, fixed size."},
{keywords:["operators"], reply:"Arithmetic (+ - * / %), Relational (== != > < >= <=), Logical (&& || !), Bitwise (& | ^ ~ << >> >>>), Assignment (=, +=...), Ternary (?:), instanceof."},
{keywords:["expressions"], reply:"An expression combines variables, operators and literals to produce a value, e.g. `a + b * 2`, evaluated per precedence/associativity rules."},
{keywords:["control statements","control flow"], reply:"Selection: if, if-else, switch. Iteration: for, while, do-while, for-each. Jump: break, continue, return."},
{keywords:["type conversion","casting","typecasting"], reply:"Widening (automatic): int→long→float→double.\nNarrowing (explicit cast): double d=9.7; int i=(int)d; — may lose precision."},
{keywords:["simple java program","hello world"], reply:"class HelloWorld {\n  public static void main(String[] args){\n    System.out.println(\"Hello, World!\");\n  }\n}\njavac HelloWorld.java  →  java HelloWorld"},
{keywords:["class","classes"], reply:"A class is a blueprint defining fields and methods.\nclass Student {\n  String name; int age;\n  void display(){ System.out.println(name+\" \"+age); }\n}"},
{keywords:["object","objects"], reply:"An object is an instance of a class with real state in memory.\nStudent s = new Student();"},
{keywords:["constructor","constructors"], reply:"Initializes a new object; same name as class, no return type.\nStudent(String n){ name = n; }\nStudent s = new Student(\"Amit\");"},
{keywords:["methods"], reply:"A method is a callable block of code that performs an action, optionally taking parameters and returning a value."},
{keywords:["access control","access modifiers"], reply:"private (class only) < default (package) < protected (package + subclasses) < public (everywhere)."},
{keywords:["this keyword","this()"], reply:"'this' = current object.\n1. this.name = name; (disambiguate)\n2. this(args); (call another constructor)\n3. pass current object: method(this);"},
{keywords:["garbage collection","gc"], reply:"Java auto-reclaims memory of unreachable objects via the Garbage Collector. System.gc() only suggests collection; it's not guaranteed/immediate."},
{keywords:["overloading","method overloading","constructor overloading"], reply:"Same method/constructor name, different parameter list — resolved at compile time.\nvoid add(int a,int b){}\nvoid add(double a,double b){}"},
{keywords:["parameter passing","pass by value"], reply:"Java is pass-by-value always. Primitives: value copied. Objects: reference copied — fields can be modified, but reassigning the reference inside the method doesn't affect the caller."},
{keywords:["recursion"], reply:"A method calling itself with a base case to stop.\nint factorial(int n){\n  if(n==0) return 1;\n  return n*factorial(n-1);\n}"},
{keywords:["nested class","inner class","nested and inner"], reply:"Static nested class (independent of outer instance), Inner class (tied to outer object), Local class (inside a method), Anonymous class (no name, instantiated inline — common in event handling)."},
{keywords:["string class","strings"], reply:"String is immutable. Common methods: length(), charAt(), substring(), indexOf(), equals(), compareTo(), split(), replace(). Use StringBuilder for mutable strings."},
{keywords:["inheritance"], reply:"Subclass acquires fields/methods of a superclass via 'extends'.\nclass Animal { void eat(){} }\nclass Dog extends Animal { void bark(){} }"},
{keywords:["subtype","substitutability","base class","subclass"], reply:"Base class = general behavior; subclass = specialization. Substitutability: a subclass object can replace a superclass reference — Animal a = new Dog();"},
{keywords:["forms of inheritance","specialization","specification","extension","limitation","combination"], reply:"Specialization (more specific version), Specification (superclass declares contract), Construction (reuse code, unrelated semantics), Extension (adds functionality), Limitation (restricts behavior), Combination (mixing via interfaces)."},
{keywords:["benefits of inheritance","costs of inheritance"], reply:"Benefits: reuse, polymorphism, hierarchy, maintainability. Costs: tight coupling, fragile base class problem, possible reduced encapsulation."},
{keywords:["member access rules"], reply:"private members aren't inherited/visible in subclasses; protected/public are; default is package-only, even for subclasses in other packages."},
{keywords:["super keyword","super()"], reply:"super() calls parent constructor (must be first statement). super.method() calls parent's overridden method. super.field accesses parent's field."},
{keywords:["final keyword","final"], reply:"final class → can't be subclassed. final method → can't be overridden. final variable → constant, can't be reassigned."},
{keywords:["polymorphism"], reply:"One interface, many forms. Compile-time: overloading. Runtime: overriding, via dynamic method dispatch.\nAnimal a = new Dog(); a.sound(); // Dog's version runs"},
{keywords:["method overriding","overriding"], reply:"Subclass redefines a method with the same signature, enabling runtime polymorphism.\nclass Dog extends Animal { void sound(){ System.out.println(\"Bark\"); } }"},
{keywords:["abstract class"], reply:"Can mix abstract (unimplemented) and concrete methods; cannot be instantiated.\nabstract class Shape { abstract double area(); }"},
{keywords:["object class"], reply:"java.lang.Object is the root of all classes. Key methods: toString(), equals(), hashCode(), getClass(), clone(), wait()/notify()."},
{keywords:["package","packages","defining a package","creating a package"], reply:"Groups related classes, avoids naming conflicts.\npackage com.myapp.utils;\nFolder structure must mirror the package name."},
{keywords:["classpath"], reply:"CLASSPATH tells the JVM/compiler where to find user classes/packages. Set via -classpath/-cp or the CLASSPATH env variable."},
{keywords:["import","importing packages"], reply:"import java.util.ArrayList; // single class\nimport java.util.*;         // whole package"},
{keywords:["class vs interface","difference between class and interface","classes and interfaces"], reply:"Class: state, constructors, concrete methods, single inheritance.\nInterface: contract of methods (+ default/static since Java 8), no constructors, multiple implementation allowed."},
{keywords:["interface","interfaces"], reply:"interface Drawable { void draw(); }\nclass Circle implements Drawable {\n  public void draw(){ System.out.println(\"Drawing\"); }\n}"},
{keywords:["variables in interface"], reply:"Interface fields are implicitly public static final — constants that must be initialized."},
{keywords:["extending interfaces","interface inheritance"], reply:"interface B extends A { ... } — an interface can extend one or more other interfaces; implementing classes must satisfy all inherited methods."},
{keywords:["exception handling","exceptions"], reply:"Manages runtime errors via try-catch-finally with throw/throws, separating error handling from normal logic and enabling graceful recovery."},
{keywords:["termination model","resumptive model"], reply:"Java uses the Termination model — once thrown, the throwing method's execution ends and does not resume (unlike the Resumptive model in some other languages)."},
{keywords:["exception hierarchy"], reply:"Throwable → Error (serious, e.g. OutOfMemoryError) and Exception → Checked (e.g. IOException) and RuntimeException (unchecked, e.g. NullPointerException)."},
{keywords:["try catch","try","catch","finally","throw","throws"], reply:"try { risky(); }\ncatch(ArithmeticException e){ }\nfinally { /* always runs */ }\n'throw' throws an instance; 'throws' declares checked exceptions in a method signature."},
{keywords:["built in exceptions","common exceptions"], reply:"ArithmeticException, NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException, NumberFormatException, IOException, InterruptedException."},
{keywords:["custom exception","own exception","exception subclass"], reply:"class InvalidAgeException extends Exception {\n  InvalidAgeException(String msg){ super(msg); }\n}\nthrow new InvalidAgeException(\"Age cannot be negative\");"},
{keywords:["multithreading","multitasking"], reply:"Multitasking = multiple processes, separate memory. Multithreading = multiple threads within one process, sharing memory — lighter weight."},
{keywords:["thread life cycle","thread states"], reply:"New → Runnable → Running → (Blocked/Waiting/Timed Waiting) → Terminated."},
{keywords:["creating threads","thread creation"], reply:"1) extend Thread, override run(), call start().\n2) implement Runnable, pass to new Thread(runnable).start()."},
{keywords:["thread priorities","priority"], reply:"Priority 1(MIN)–10(MAX), default 5(NORM), set via setPriority(). Scheduler favors higher priority, but not guaranteed."},
{keywords:["synchronizing threads","synchronization","synchronized"], reply:"synchronized void increment(){ count++; } — only one thread can hold the lock on the object at a time, preventing race conditions."},
{keywords:["inter thread communication","wait notify"], reply:"wait(), notify(), notifyAll() (in Object, used inside synchronized blocks) coordinate threads — e.g. producer-consumer."},
{keywords:["thread groups"], reply:"ThreadGroup lets you manage a set of threads together — e.g. set max priority or interrupt them all at once."},
{keywords:["daemon thread","daemon threads"], reply:"Background thread (e.g. GC) that doesn't block JVM exit. setDaemon(true) before start()."},
{keywords:["java.util","util package"], reply:"java.util: Collections framework, Scanner, Date/Calendar, Random, StringTokenizer, Optional."},
{keywords:["java.io","io package"], reply:"java.io: File, FileReader/Writer, BufferedReader/Writer, InputStream/OutputStream, Object streams for serialization."},
{keywords:["event handling","events"], reply:"Delegation Event Model: source generates an event object, listener registered on the source handles it.\nbutton.addActionListener(e -> System.out.println(\"Clicked\"));"},
{keywords:["mouse event","keyboard event","mouse and keyboard"], reply:"MouseListener: mouseClicked/Pressed/Released/Entered/Exited.\nKeyListener: keyPressed/Released/Typed.\nAdapter classes give empty defaults so you override only what's needed."},
{keywords:["adapter class","adapter classes"], reply:"Adapter classes (MouseAdapter, KeyAdapter, WindowAdapter) implement listener interfaces with empty bodies — extend and override only what you need."},
{keywords:["layout manager","border layout","grid layout","flow layout","card layout","gridbag"], reply:"FlowLayout (wraps left-right), BorderLayout (5 regions), GridLayout (equal grid), CardLayout (stacked, one shown at a time), GridBagLayout (fine-grained control)."},
{keywords:["swing","limitations of awt"], reply:"Swing = lightweight, pluggable-look-and-feel GUI toolkit built on AWT. AWT was heavyweight/OS-dependent with fewer, less consistent components."},
{keywords:["mvc","mvc architecture"], reply:"MVC: Model (data/state), View (visual representation), Controller (handles input, updates model) — decouples data from presentation."},
{keywords:["jframe","jcomponent"], reply:"JFrame = top-level window. JComponent = base class for most Swing widgets (borders, tooltips etc.).\nJFrame f=new JFrame(\"Title\"); f.setSize(400,300); f.setVisible(true);"},
{keywords:["jlabel","imageicon","jtextfield","jbutton","jcheckbox","jradiobutton"], reply:"JLabel (text/icon), ImageIcon (images), JTextField (text input), JButton (button), JCheckBox (toggle), JRadioButton (mutually exclusive, grouped via ButtonGroup)."},
{keywords:["jlist","jcombobox"], reply:"JList — selectable list of items. JComboBox — compact dropdown selection."},
{keywords:["tabbed pane","scroll pane","tree","jtable","tables"], reply:"JTabbedPane (tabs), JScrollPane (scrollbars), JTree (hierarchical data), JTable (tabular data via TableModel)."},
{keywords:["menu","jmenubar","jmenu","jmenuitem","popup menu"], reply:"JMenuBar > JMenu > JMenuItem/JCheckBoxMenuItem/JRadioButtonMenuItem, JSeparator (divider). JPopupMenu shown via show(component,x,y)."},
{keywords:["jdbc"], reply:"JDBC steps: load driver → DriverManager.getConnection() → Statement/PreparedStatement → executeQuery/executeUpdate → process ResultSet → close resources."},
{keywords:["jdbc driver","type 1","type 2","type 3","type 4"], reply:"Type 1: JDBC-ODBC bridge (obsolete). Type 2: Native-API. Type 3: Network Protocol (middleware). Type 4: Thin pure-Java driver (most common)."},
{keywords:["querying a database","executequery","executeupdate","updating data"], reply:"executeQuery() → SELECT, returns ResultSet.\nexecuteUpdate() → INSERT/UPDATE/DELETE, returns affected row count.\nPreparedStatement avoids SQL injection and allows parameter binding (?)."},
{keywords:["collections","list","arraylist","linkedlist","vector","stack"], reply:"ArrayList (resizable array, fast access), LinkedList (fast insert/delete), Vector (synchronized legacy), Stack (LIFO, extends Vector)."},
{keywords:["set","hashset","linkedhashset","treeset"], reply:"HashSet (no order, fast), LinkedHashSet (insertion order), TreeSet (sorted, red-black tree)."},
{keywords:["queue","priorityqueue","arraydeque"], reply:"PriorityQueue (orders by priority, not strict FIFO), ArrayDeque (efficient double-ended queue, good stack/queue replacement)."},
{keywords:["map","hashmap","treemap","linkedhashmap"], reply:"HashMap (no order, fast), LinkedHashMap (insertion order), TreeMap (sorted by key)."},
{keywords:["stream api","streams","need for stream"], reply:"Stream API (Java 8+) enables declarative, functional-style operations on collections, easy to parallelize.\nnums.stream().filter(n->n%2==0).mapToInt(n->n).sum();"},
{keywords:["stream operations","filter","map(","flatmap","distinct","sorted","reduce","peek","limit","skip","foreach","forEachOrdered","toarray","collect"], reply:"filter, map, flatMap (flatten), distinct, sorted, reduce (combine to one value), peek (debug), limit/skip (truncate), forEach/forEachOrdered, toArray, collect (into List/Set/Map)."},
{
        keywords: ["oop", "object oriented programming", "oop paradigm"],
        reply: `OOP stands for Object-Oriented Programming. It organizes programs around objects and classes.

The four major OOP concepts are:
1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism`
    },

    {
        keywords: ["need for oop", "why oop", "advantages of oop"],
        reply: `OOP is needed to manage complex software systems.

Advantages:
• Code reusability
• Modularity
• Data security
• Maintainability
• Flexibility
• Easy debugging and testing`
    },

    {
        keywords: ["abstraction"],
        reply: `Abstraction hides implementation details and exposes only essential features.

Example:

abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double r = 5;

    double area() {
        return 3.14 * r * r;
    }
}`
    },

    {
        keywords: ["encapsulation"],
        reply: `Encapsulation means wrapping data and methods inside a class and controlling access using access modifiers.

Example:

class Student {
    private int marks;

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public int getMarks() {
        return marks;
    }
}`
    },

    {
        keywords: ["inheritance"],
        reply: `Inheritance allows a subclass to acquire properties and methods of a superclass.

Example:

class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}`
    },

    {
        keywords: ["polymorphism"],
        reply: `Polymorphism means one name can have multiple forms.

Java supports:
1. Compile-time polymorphism - Method Overloading
2. Runtime polymorphism - Method Overriding`
    },

    {
        keywords: ["history of java", "java history"],
        reply: `Java was developed at Sun Microsystems by James Gosling and his team. It was initially called Oak and was designed for portable, platform-independent programming. Java was officially released in 1995.`
    },

    {
        keywords: ["java buzzwords", "buzzwords"],
        reply: `Important Java buzzwords include:

Simple
Object-Oriented
Distributed
Robust
Secure
Architecture Neutral
Portable
High Performance
Multithreaded
Interpreted
Dynamic`
    },

    {
        keywords: ["data types", "datatype", "java data types"],
        reply: `Java data types are divided into:

1. Primitive:
byte, short, int, long, float, double, char, boolean

2. Reference:
Classes, Objects, Arrays, Interfaces, Strings, etc.`
    },

    {
        keywords: ["variables", "java variables"],
        reply: `Java variables are mainly:

1. Local variables
2. Instance variables
3. Static variables

Example:

class Student {
    int rollNo;          // instance variable
    static int count;    // static variable

    void display() {
        int marks = 90;  // local variable
    }
}`
    },

    {
        keywords: ["scope of variable", "scope"],
        reply: `Scope defines where a variable can be accessed.

Local variable:
Available only inside its method/block.

Instance variable:
Available throughout the class through an object.

Static variable:
Associated with the class and shared by objects.`
    },

    {
        keywords: ["lifetime of variable", "variable lifetime"],
        reply: `Lifetime means how long a variable exists in memory.

Local variables normally exist during method execution.
Instance variables exist as long as their objects are reachable.
Static variables generally exist while the class is loaded.`
    },

    {
        keywords: ["arrays", "array", "java array"],
        reply: `An array stores multiple values of the same type.

Example:

int[] numbers = {10, 20, 30, 40};

for(int n : numbers) {
    System.out.println(n);
}`
    },

    {
        keywords: ["operators", "java operators"],
        reply: `Java operators include:

Arithmetic: + - * / %
Relational: < > <= >= == !=
Logical: && || !
Assignment: = += -= *= /=
Unary: ++ --
Bitwise: & | ^ ~
Shift: << >> >>>
Conditional: ?:
`
    },

    {
        keywords: ["expressions", "java expression"],
        reply: `An expression is a combination of variables, values and operators that produces a result.

Example:

int a = 10;
int b = 20;
int c = a + b;

Here a + b is an expression.`
    },

    {
        keywords: ["control statements", "control statement"],
        reply: `Java control statements include:

Selection:
if, if-else, switch

Iteration:
for, while, do-while

Jump:
break, continue, return`
    },

    {
        keywords: ["type conversion", "type casting", "casting"],
        reply: `Type conversion changes a value from one data type to another.

Widening:

int x = 10;
double y = x;

Narrowing:

double d = 10.5;
int x = (int)d;`
    },

    {
        keywords: ["simple java program", "java program"],
        reply: `Basic Java program:

class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}

main() is the entry point of a Java application.`
    },

    {
        keywords: ["class", "java class"],
        reply: `A class is a blueprint or template used to create objects.

Example:

class Student {
    int rollNo;
    String name;

    void display() {
        System.out.println(rollNo + " " + name);
    }
}`
    },

    {
        keywords: ["object", "java object", "objects"],
        reply: `An object is an instance of a class.

Example:

Student s = new Student();

Here Student is the class and s is an object reference.`
    },

    {
        keywords: ["constructor", "constructors"],
        reply: `A constructor initializes an object. It has the same name as the class and has no return type.

Example:

class Student {
    Student() {
        System.out.println("Constructor called");
    }
}

Student s = new Student();`
    },

    {
        keywords: ["constructor overloading"],
        reply: `Constructor overloading means defining multiple constructors with different parameter lists.

class Student {

    Student() {
        System.out.println("Default");
    }

    Student(int id) {
        System.out.println("ID: " + id);
    }
}`
    },

    {
        keywords: ["methods", "java methods"],
        reply: `A method is a block of code that performs a specific task.

Example:

class Demo {

    void display() {
        System.out.println("Hello");
    }

    public static void main(String[] args) {
        Demo d = new Demo();
        d.display();
    }
}`
    },

    {
        keywords: ["access control", "access modifiers", "access modifier"],
        reply: `Java provides four access levels:

public    - accessible everywhere
protected - same package and subclasses
default   - same package
private   - same class only`
    },

    {
        keywords: ["this keyword", "this"],
        reply: `The this keyword refers to the current object.

Example:

class Student {
    int age;

    Student(int age) {
        this.age = age;
    }
}`
    },

    {
        keywords: ["garbage collection", "garbage collector"],
        reply: `Garbage collection automatically removes objects that are no longer reachable.

Example:

Student s = new Student();
s = null;

The object may become eligible for garbage collection.`
    },

    {
        keywords: ["method overloading", "overloading"],
        reply: `Method overloading means multiple methods have the same name but different parameter lists.

class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}`
    },

    {
        keywords: ["parameter passing", "passing parameters"],
        reply: `Java uses pass-by-value.

For primitive values, the value is copied.
For object references, the reference value is copied.

Example:

void display(int x) {
    System.out.println(x);
}`
    },

    {
        keywords: ["recursion", "recursive method"],
        reply: `Recursion occurs when a method calls itself.

Example:

static int factorial(int n) {
    if(n == 0)
        return 1;

    return n * factorial(n - 1);
}`
    },

    {
        keywords: ["nested class", "nested classes"],
        reply: `A nested class is a class declared inside another class.

Example:

class Outer {

    class Inner {
        void display() {
            System.out.println("Inner class");
        }
    }
}`
    },

    {
        keywords: ["inner class"],
        reply: `An inner class is a non-static nested class associated with an instance of its outer class.

Example:

class Outer {
    class Inner {
        void show() {
            System.out.println("Inner");
        }
    }
}`
    },

    {
        keywords: ["string class", "string", "java string"],
        reply: `String is a class in java.lang used to represent a sequence of characters.

Example:

String name = "Java";

Important String methods include:
length()
charAt()
substring()
equals()
equalsIgnoreCase()
toUpperCase()
toLowerCase()
trim()
replace()`
    },


    // =========================================================
    // UNIT II - INHERITANCE, PACKAGES AND INTERFACES
    // =========================================================

    {
        keywords: ["hierarchical inheritance", "hierarchical"],
        reply: `Hierarchical inheritance occurs when multiple subclasses inherit from one superclass.

class Animal { }

class Dog extends Animal { }

class Cat extends Animal { }`
    },

    {
        keywords: ["base class", "base class object", "superclass"],
        reply: `A base class or superclass is the class whose properties and methods are inherited by another class.

Example:

class Animal {
    void eat() {
        System.out.println("Eating");
    }
}`
    },

    {
        keywords: ["subclass", "sub class"],
        reply: `A subclass is a class that inherits from another class.

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}`
    },

    {
        keywords: ["subtype", "sub type"],
        reply: `A subtype is a type whose values can be used wherever the supertype is expected.

Example:

Animal a = new Dog();

Dog is a subtype of Animal.`
    },

    {
        keywords: ["substitutability"],
        reply: `Substitutability means an object of a subclass can be substituted for an object of its superclass without breaking the expected behavior.

Example:

Animal a = new Dog();`
    },

    {
        keywords: ["forms of inheritance"],
        reply: `Common forms of inheritance include:

Single
Multilevel
Hierarchical

Java does not support multiple inheritance of classes directly, but multiple inheritance of type can be achieved using interfaces.`
    },

    {
        keywords: ["benefits of inheritance", "inheritance benefits"],
        reply: `Benefits of inheritance:

• Code reuse
• Method overriding
• Runtime polymorphism
• Easier maintenance
• Extensibility
• Hierarchical classification`
    },

    {
        keywords: ["costs of inheritance", "inheritance costs"],
        reply: `Inheritance can increase coupling between classes, make designs complex and create fragile dependencies between superclass and subclasses.`
    },

    {
        keywords: ["member access rules"],
        reply: `Member access depends on the access modifier.

private  - class only
default  - same package
protected - same package and subclasses
public   - everywhere`
    },

    {
        keywords: ["super keyword", "super"],
        reply: `The super keyword refers to the immediate superclass.

Uses:
1. Access superclass variable
2. Call superclass method
3. Call superclass constructor

Example:

super();
super.display();
super.x;`
    },

    {
        keywords: ["final keyword", "final with inheritance"],
        reply: `The final keyword affects inheritance:

final class - cannot be inherited
final method - cannot be overridden
final variable - cannot be reassigned`
    },

    {
        keywords: ["method overriding", "overriding"],
        reply: `Method overriding occurs when a subclass provides its own implementation of an inherited method.

class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}`
    },

    {
        keywords: ["abstract class", "abstract classes"],
        reply: `An abstract class cannot be directly instantiated. It can contain abstract and concrete methods.

abstract class Shape {
    abstract void draw();

    void display() {
        System.out.println("Shape");
    }
}`
    },

    {
        keywords: ["object class", "java.lang.object"],
        reply: `Object is the root class of the Java class hierarchy.

Important methods include:

toString()
equals()
hashCode()
getClass()
wait()
notify()
notifyAll()`
    },

    {
        keywords: ["package", "packages", "java package"],
        reply: `A package is used to organize related classes and interfaces.

Example:

package mypack;

public class Student {
    public void display() {
        System.out.println("Student");
    }
}`
    },

    {
        keywords: ["creating package", "create package"],
        reply: `To create a package:

package mypack;

public class Demo {
    public void display() {
        System.out.println("Hello");
    }
}

Compile using:

javac -d . Demo.java`
    },

    {
        keywords: ["classpath", "class path"],
        reply: `CLASSPATH tells Java tools where to search for classes and packages.

Example:

set CLASSPATH=.;C:\\JavaClasses`
    },

    {
        keywords: ["import package", "importing packages", "import"],
        reply: `The import statement allows classes from another package to be used.

Example:

import java.util.Scanner;

Scanner sc = new Scanner(System.in);`
    },

    {
        keywords: ["class and interface", "difference between class and interface"],
        reply: `Class:
• Can contain instance variables
• Can have constructors
• Can be instantiated if not abstract

Interface:
• Defines a contract
• A class implements it
• Variables are public static final by default
• Supports multiple inheritance of type`
    },

    {
        keywords: ["interface", "interfaces"],
        reply: `An interface defines a contract.

Example:

interface Animal {
    void sound();
}

class Dog implements Animal {

    public void sound() {
        System.out.println("Bark");
    }
}`
    },

    {
        keywords: ["implement interface", "implementing interface", "implements"],
        reply: `A class implements an interface using the implements keyword.

interface A {
    void display();
}

class B implements A {

    public void display() {
        System.out.println("Hello");
    }
}`
    },

    {
        keywords: ["interface variables", "variables in interface"],
        reply: `Variables declared in an interface are implicitly public, static and final.

interface Demo {
    int VALUE = 100;
}

Demo.VALUE;`
    },

    {
        keywords: ["extending interface", "extends interface"],
        reply: `An interface can extend another interface.

interface A {
    void show();
}

interface B extends A {
    void display();
}

A class implementing B must implement both methods.`
    },


    // =========================================================
    // UNIT III - EXCEPTION HANDLING AND MULTITHREADING
    // =========================================================

    {
        keywords: ["exception handling", "exception"],
        reply: `Exception handling manages runtime errors and prevents abnormal program termination.

Main keywords:

try
catch
throw
throws
finally`
    },

    {
        keywords: ["benefits of exception handling"],
        reply: `Benefits include:

• Separates error-handling code
• Prevents abnormal termination
• Improves reliability
• Allows recovery
• Makes programs easier to maintain`
    },

    {
        keywords: ["termination model", "termination model exception"],
        reply: `In the termination model, once an exception occurs, normal execution of the current block stops and control transfers to an appropriate exception handler.`
    },

    {
        keywords: ["resumptive model", "resumptive"],
        reply: `In a resumptive exception model, execution may continue or resume after the error is handled. Java primarily follows the termination model.`
    },

    {
        keywords: ["exception hierarchy", "exception hierarchy java"],
        reply: `Java exception hierarchy starts with Throwable.

Throwable
├── Error
└── Exception
    ├── RuntimeException
    └── Other checked exceptions`
    },

    {
        keywords: ["try catch", "try catch block"],
        reply: `try contains code that may generate an exception. catch handles the exception.

try {
    int x = 10 / 0;
}
catch(ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}`
    },

    {
        keywords: ["throw keyword", "throw"],
        reply: `throw is used to explicitly throw an exception.

throw new ArithmeticException("Invalid operation");`
    },

    {
        keywords: ["throws keyword", "throws"],
        reply: `throws declares exceptions that a method may pass to its caller.

void readFile() throws IOException {
    // file operation
}`
    },

    {
        keywords: ["finally keyword", "finally"],
        reply: `finally is generally executed whether an exception occurs or not.

try {
    System.out.println("Try");
}
finally {
    System.out.println("Cleanup");
}`
    },

    {
        keywords: ["built in exceptions", "predefined exceptions"],
        reply: `Common Java exceptions include:

ArithmeticException
NullPointerException
ArrayIndexOutOfBoundsException
NumberFormatException
ClassCastException
IOException
FileNotFoundException
IllegalArgumentException`
    },

    {
        keywords: ["custom exception", "user defined exception", "own exception"],
        reply: `You can create your own exception by extending Exception.

class AgeException extends Exception {

    AgeException(String message) {
        super(message);
    }
}

throw new AgeException("Invalid age");`
    },

    {
        keywords: ["multitasking", "multitasking vs multithreading"],
        reply: `Multitasking means executing multiple tasks or processes.

Multithreading means executing multiple threads within a process.

Multitasking:
Process-oriented

Multithreading:
Thread-oriented`
    },

    {
        keywords: ["multithreading", "multithread"],
        reply: `Multithreading allows multiple threads to execute concurrently within a program.

Benefits:
• Better responsiveness
• Resource sharing
• Improved concurrency
• Efficient CPU utilization`
    },

    {
        keywords: ["thread life cycle", "thread lifecycle"],
        reply: `Common Java thread states are:

NEW
RUNNABLE
BLOCKED
WAITING
TIMED_WAITING
TERMINATED`
    },

    {
        keywords: ["creating thread", "create thread", "thread creation"],
        reply: `Threads can commonly be created by:

1. Extending Thread
2. Implementing Runnable

Example:

class MyThread extends Thread {

    public void run() {
        System.out.println("Thread running");
    }
}

new MyThread().start();`
    },

    {
        keywords: ["thread priority", "thread priorities"],
        reply: `Thread priority ranges from 1 to 10.

Thread.MIN_PRIORITY = 1
Thread.NORM_PRIORITY = 5
Thread.MAX_PRIORITY = 10

Example:

t.setPriority(Thread.MAX_PRIORITY);`
    },

    {
        keywords: ["synchronization", "synchronized", "synchronizing threads"],
        reply: `Synchronization controls access to shared resources.

Example:

synchronized void display() {
    // critical section
}`
    },

    {
        keywords: ["inter thread communication", "inter-thread communication", "thread communication"],
        reply: `Inter-thread communication allows threads to coordinate using:

wait()
notify()
notifyAll()

These methods are associated with object monitors and synchronization.`
    },

    {
        keywords: ["thread groups", "thread group"],
        reply: `A ThreadGroup is used to organize multiple threads into a group.

Example:

ThreadGroup group =
    new ThreadGroup("MyGroup");`
    },

    {
        keywords: ["daemon thread", "daemon threads"],
        reply: `A daemon thread is a background service thread.

Example:

Thread t = new Thread();
t.setDaemon(true);
t.start();

The JVM can exit when no non-daemon threads remain.`
    },


    // =========================================================
    // UNIT IV - UTIL, IO, EVENTS AND AWT
    // =========================================================

    {
        keywords: ["java util", "java.util", "util package"],
        reply: `java.util contains utility and collection classes.

Examples:
Scanner
ArrayList
LinkedList
HashSet
HashMap
Collections
Arrays
Random`
    },

    {
        keywords: ["java io", "java.io", "io package"],
        reply: `java.io provides classes for input and output.

Important classes:
File
FileReader
FileWriter
BufferedReader
BufferedWriter
InputStream
OutputStream`
    },

    {
        keywords: ["event handling", "event"],
        reply: `Event handling allows a Java GUI program to respond to user actions such as mouse clicks and keyboard input.

The Delegation Event Model uses:
Event Source
Event Object
Event Listener`
    },

    {
        keywords: ["event source", "event sources"],
        reply: `An event source is a GUI component that generates an event.

Examples:
Button
TextField
Checkbox
Mouse
Keyboard`
    },

    {
        keywords: ["event class", "event classes"],
        reply: `Event classes represent events generated by GUI components.

Examples:
ActionEvent
MouseEvent
KeyEvent
WindowEvent
ItemEvent`
    },

    {
        keywords: ["event listener", "event listeners"],
        reply: `An event listener receives and handles events.

Examples:

ActionListener
MouseListener
MouseMotionListener
KeyListener
WindowListener
ItemListener`
    },

    {
        keywords: ["delegation event model", "delegation model"],
        reply: `The Delegation Event Model consists of:

1. Event Source
2. Event Object
3. Event Listener

The source generates the event and delegates handling to the registered listener.`
    },

    {
        keywords: ["mouse event", "mouse events", "mouse handling"],
        reply: `Mouse events can be handled using MouseListener and MouseMotionListener.

Methods include:

mouseClicked()
mousePressed()
mouseReleased()
mouseEntered()
mouseExited()`
    },

    {
        keywords: ["keyboard event", "keyboard events", "key event"],
        reply: `Keyboard events are handled using KeyListener.

Methods include:

keyPressed()
keyReleased()
keyTyped()`
    },

    {
        keywords: ["adapter class", "adapter classes"],
        reply: `Adapter classes provide default implementations of listener methods.

Example:

class MyAdapter extends MouseAdapter {

    public void mouseClicked(MouseEvent e) {
        System.out.println("Clicked");
    }
}`
    },

    {
        keywords: ["graphics", "java graphics"],
        reply: `The Graphics class provides methods for drawing shapes, strings and images.

Example:

public void paint(Graphics g) {
    g.drawString("Hello Java", 50, 50);
    g.drawRect(50, 70, 100, 60);
    g.drawOval(50, 150, 100, 60);
}`
    },

    {
        keywords: ["layout manager", "layout managers"],
        reply: `Layout managers automatically arrange GUI components.

Important layouts:
• FlowLayout
• BorderLayout
• GridLayout
• CardLayout
• GridBagLayout`
    },

    {
        keywords: ["border layout", "borderlayout"],
        reply: `BorderLayout divides a container into five regions:

NORTH
SOUTH
EAST
WEST
CENTER`
    },

    {
        keywords: ["flow layout", "flowlayout"],
        reply: `FlowLayout arranges components from left to right and moves components to the next line when necessary.`
    },

    {
        keywords: ["grid layout", "gridlayout"],
        reply: `GridLayout arranges components in rows and columns with equal-sized cells.

Example:

new GridLayout(3, 2);`
    },

    {
        keywords: ["card layout", "cardlayout"],
        reply: `CardLayout treats each component as a card. Only one card is normally visible at a time.`
    },

    {
        keywords: ["grid bag layout", "gridbaglayout"],
        reply: `GridBagLayout is a flexible layout manager that allows components to occupy different sizes and positions using GridBagConstraints.`
    },


    // =========================================================
    // UNIT V - SWING
    // =========================================================

    {
        keywords: ["swing"],
        reply: `Swing is Java's GUI toolkit built on top of AWT.

Swing provides lightweight components such as:

JFrame
JLabel
JButton
JTextField
JTable
JTree
JList
JComboBox`
    },

    {
        keywords: ["limitations of awt", "awt limitations"],
        reply: `AWT components are heavyweight and depend more on native operating-system components. Swing provides a larger set of lightweight, more flexible GUI components.`
    },

    {
        keywords: ["mvc", "mvc architecture"],
        reply: `MVC stands for:

Model - Data and application state
View - User interface
Controller - Handles user interaction

MVC separates responsibilities and improves maintainability.`
    },

    {
        keywords: ["jframe"],
        reply: `JFrame is a top-level Swing container used to create a GUI window.

Example:

JFrame frame = new JFrame("My Window");

frame.setSize(400, 300);
frame.setVisible(true);`
    },

    {
        keywords: ["jcomponent"],
        reply: `JComponent is the base class for most Swing components such as JButton, JLabel, JTextField and JList.`
    },

    {
        keywords: ["jlabel"],
        reply: `JLabel displays text, images or both.

JLabel label =
    new JLabel("Welcome to Java");`
    },

    {
        keywords: ["imageicon"],
        reply: `ImageIcon is used to create an icon from an image.

ImageIcon icon =
    new ImageIcon("java.png");

JLabel label =
    new JLabel(icon);`
    },

    {
        keywords: ["jtextfield"],
        reply: `JTextField allows the user to enter a single line of text.

JTextField text =
    new JTextField(20);`
    },

    {
        keywords: ["jbutton"],
        reply: `JButton creates a clickable button.

JButton button =
    new JButton("Submit");`
    },

    {
        keywords: ["jcheckbox", "checkbox"],
        reply: `JCheckBox allows independent selection of an option.

JCheckBox java =
    new JCheckBox("Java");`
    },

    {
        keywords: ["jradiobutton", "radio button"],
        reply: `JRadioButton is generally used when selecting one option from a group.

JRadioButton male =
    new JRadioButton("Male");`
    },

    {
        keywords: ["jlist", "list component"],
        reply: `JList displays a list of selectable items.

String[] languages = {
    "Java", "Python", "C++"
};

JList<String> list =
    new JList<>(languages);`
    },

    {
        keywords: ["jcombobox", "combo box"],
        reply: `JComboBox provides a drop-down list.

String[] courses = {
    "Java", "Python", "HTML"
};

JComboBox<String> combo =
    new JComboBox<>(courses);`
    },

    {
        keywords: ["tabbed panes", "jtabbedpane", "tabbed pane"],
        reply: `JTabbedPane allows multiple panels to be displayed as tabs.

JTabbedPane tabs =
    new JTabbedPane();

tabs.addTab("Home", panel1);
tabs.addTab("About", panel2);`
    },

    {
        keywords: ["scroll panes", "jscrollpane", "scroll pane"],
        reply: `JScrollPane provides scrolling support for components whose contents are larger than the visible area.

JScrollPane scroll =
    new JScrollPane(textArea);`
    },

    {
        keywords: ["jtree", "trees", "swing tree"],
        reply: `JTree displays hierarchical data.

Example hierarchy:

Computer
├── Hardware
│   ├── Keyboard
│   └── Mouse
└── Software`
    },

    {
        keywords: ["jtable", "tables", "swing table"],
        reply: `JTable displays data in rows and columns.

Example:

String[] columns = {"ID", "Name"};

String[][] data = {
    {"1", "Ravi"},
    {"2", "Anil"}
};

JTable table =
    new JTable(data, columns);`
    },

    {
        keywords: ["menubar", "jmenubar", "menu bar"],
        reply: `JMenuBar contains menus in a Swing application.

JMenuBar bar = new JMenuBar();
JMenu file = new JMenu("File");

bar.add(file);`
    },

    {
        keywords: ["jmenu", "menu"],
        reply: `JMenu represents a menu such as File, Edit or Help.

JMenu file = new JMenu("File");`
    },

    {
        keywords: ["jmenuitem", "menu item"],
        reply: `JMenuItem represents an individual menu command.

JMenuItem open =
    new JMenuItem("Open");`
    },

    {
        keywords: ["jcheckboxmenuitem", "checkbox menu"],
        reply: `JCheckBoxMenuItem creates a selectable menu item.

JCheckBoxMenuItem item =
    new JCheckBoxMenuItem("Show Toolbar");`
    },

    {
        keywords: ["jradiobuttonmenuitem", "radio button menu"],
        reply: `JRadioButtonMenuItem creates a radio-button style menu option. Multiple items can be grouped using ButtonGroup.`
    },

    {
        keywords: ["jseparator", "separator"],
        reply: `JSeparator visually separates groups of menu items.

JMenu menu = new JMenu("File");
menu.addSeparator();`
    },

    {
        keywords: ["popup menu", "popupmenu", "jpopupmenu"],
        reply: `JPopupMenu creates a context or popup menu.

JPopupMenu popup =
    new JPopupMenu();

popup.add(new JMenuItem("Copy"));
popup.add(new JMenuItem("Paste"));`
    },


    // =========================================================
    // UNIT VI - JDBC
    // =========================================================

    {
        keywords: ["jdbc"],
        reply: `JDBC stands for Java Database Connectivity. It allows Java applications to connect to databases, execute SQL statements and process results.

Main JDBC classes/interfaces include:

DriverManager
Connection
Statement
PreparedStatement
ResultSet`
    },

    {
        keywords: ["jdbc drivers", "jdbc type 1", "type 1 driver"],
        reply: `JDBC Type 1 driver is the JDBC-ODBC Bridge driver. It uses ODBC and is obsolete in modern Java environments.`
    },

    {
        keywords: ["type 2 driver", "jdbc type 2"],
        reply: `Type 2 JDBC drivers use native database APIs and require database-specific native libraries.`
    },

    {
        keywords: ["type 3 driver", "jdbc type 3"],
        reply: `Type 3 JDBC drivers use a middleware server between the Java application and database.`
    },

    {
        keywords: ["type 4 driver", "jdbc type 4"],
        reply: `Type 4 JDBC drivers are pure Java drivers that communicate directly with the database protocol. They are commonly used in modern JDBC applications.`
    },

    {
        keywords: ["database connection", "connecting database", "connect database"],
        reply: `Basic JDBC connection:

Connection con =
    DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/test",
        "root",
        "password"
    );

System.out.println("Connected");`
    },

    {
        keywords: ["jdbc connection program", "jdbc program"],
        reply: `Example:

import java.sql.*;

class JDBCExample {

    public static void main(String[] args) {

        try {

            Connection con =
                DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/test",
                    "root",
                    "password"
                );

            System.out.println("Connected");

            con.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}`
    },

    {
        keywords: ["query database", "jdbc query", "select jdbc"],
        reply: `A JDBC SELECT query can be executed using Statement or PreparedStatement.

Statement stmt = con.createStatement();

ResultSet rs =
    stmt.executeQuery("SELECT * FROM students");

while(rs.next()) {
    System.out.println(
        rs.getInt("id") + " " +
        rs.getString("name")
    );
}`
    },

    {
        keywords: ["resultset", "processing results", "result set"],
        reply: `ResultSet represents the data returned by a SELECT query.

while(rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");

    System.out.println(id + " " + name);
}`
    },

    {
        keywords: ["update data jdbc", "jdbc update", "update jdbc"],
        reply: `JDBC uses executeUpdate() for INSERT, UPDATE and DELETE operations.

PreparedStatement ps =
    con.prepareStatement(
        "UPDATE students SET name=? WHERE id=?"
    );

ps.setString(1, "Ravi");
ps.setInt(2, 101);

int rows = ps.executeUpdate();`
    },


    // =========================================================
    // COLLECTIONS
    // =========================================================

    {
        keywords: ["collections", "collection framework", "java collections"],
        reply: `The Java Collections Framework provides interfaces and classes for storing and manipulating groups of objects.

Main categories:

List
Set
Queue
Map`
    },

    {
        keywords: ["list", "list interface"],
        reply: `List is an ordered collection that generally permits duplicate elements.

Common implementations:

ArrayList
LinkedList
Vector
Stack`
    },

    {
        keywords: ["arraylist"],
        reply: `ArrayList is a resizable-array implementation of List.

Example:

ArrayList<String> list =
    new ArrayList<>();

list.add("Java");
list.add("Python");

System.out.println(list);`
    },

    {
        keywords: ["linkedlist"],
        reply: `LinkedList is a List and Deque implementation based on linked nodes.

LinkedList<String> list =
    new LinkedList<>();

list.add("Java");
list.add("Python");`
    },

    {
        keywords: ["vector"],
        reply: `Vector is a growable array implementation. Its legacy methods are synchronized.

Vector<Integer> v =
    new Vector<>();

v.add(10);
v.add(20);`
    },

    {
        keywords: ["stack"],
        reply: `Stack is a legacy LIFO collection.

Stack<Integer> stack =
    new Stack<>();

stack.push(10);
stack.push(20);

System.out.println(stack.pop());`
    },

    {
        keywords: ["set", "set interface"],
        reply: `Set is a collection that does not allow duplicate elements.

Common implementations:

HashSet
LinkedHashSet
TreeSet`
    },

    {
        keywords: ["hashset"],
        reply: `HashSet stores unique elements without guaranteeing iteration order.

HashSet<String> set =
    new HashSet<>();

set.add("Java");
set.add("Java");

System.out.println(set);`
    },

    {
        keywords: ["linkedhashset"],
        reply: `LinkedHashSet maintains insertion order while ensuring unique elements.`
    },

    {
        keywords: ["treeset"],
        reply: `TreeSet stores unique elements in sorted order.

TreeSet<Integer> set =
    new TreeSet<>();

set.add(30);
set.add(10);
set.add(20);`
    },

    {
        keywords: ["queue", "queue interface"],
        reply: `Queue is generally used for holding elements before processing.

Common implementations:

PriorityQueue
ArrayDeque`
    },

    {
        keywords: ["priorityqueue"],
        reply: `PriorityQueue processes elements according to their priority rather than simple insertion order.

PriorityQueue<Integer> q =
    new PriorityQueue<>();

q.add(30);
q.add(10);
q.add(20);

System.out.println(q.poll());`
    },

    {
        keywords: ["arraydeque", "deque"],
        reply: `ArrayDeque is a resizable-array implementation of Deque. It supports insertion and removal at both ends.

ArrayDeque<Integer> dq =
    new ArrayDeque<>();

dq.addFirst(10);
dq.addLast(20);`
    },

    {
        keywords: ["map", "map interface"],
        reply: `Map stores key-value pairs.

Common implementations:

HashMap
TreeMap
LinkedHashMap`
    },

    {
        keywords: ["hashmap"],
        reply: `HashMap stores key-value pairs and allows one null key.

HashMap<Integer, String> map =
    new HashMap<>();

map.put(101, "Ravi");
map.put(102, "Anil");

System.out.println(map.get(101));`
    },

    {
        keywords: ["treemap"],
        reply: `TreeMap stores key-value pairs sorted according to keys.

TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(3, "C");
map.put(1, "A");
map.put(2, "B");`
    },

    {
        keywords: ["linkedhashmap"],
        reply: `LinkedHashMap maintains a predictable iteration order, normally insertion order.

LinkedHashMap<Integer, String> map =
    new LinkedHashMap<>();`
    },


    // =========================================================
    // STREAM API
    // =========================================================

    {
        keywords: ["stream api", "streams", "java streams"],
        reply: `The Stream API provides a declarative way to process collections of data.

Typical pipeline:

Source
→ Intermediate Operations
→ Terminal Operation

Example:

list.stream()
    .filter(n -> n > 10)
    .forEach(System.out::println);`
    },

    {
        keywords: ["need for stream api", "why stream api"],
        reply: `Stream API makes collection processing concise, readable and expressive. It supports filtering, mapping, sorting, reduction and other operations and can also support parallel processing.`
    },

    {
        keywords: ["filter", "filter()"],
        reply: `filter() selects elements that satisfy a condition.

List<Integer> nums =
    Arrays.asList(10, 15, 20, 25);

nums.stream()
    .filter(n -> n > 15)
    .forEach(System.out::println);`
    },

    {
        keywords: ["map", "map()"],
        reply: `map() transforms each stream element into another value.

List<Integer> nums =
    Arrays.asList(1, 2, 3);

nums.stream()
    .map(n -> n * n)
    .forEach(System.out::println);

Output:
1
4
9`
    },

    {
        keywords: ["flatmap", "flatMap()"],
        reply: `flatMap() transforms each element into a stream and then flattens all resulting streams into one stream.

Example:

List<List<Integer>> data =
    Arrays.asList(
        Arrays.asList(1,2),
        Arrays.asList(3,4)
    );

data.stream()
    .flatMap(List::stream)
    .forEach(System.out::println);`
    },

    {
        keywords: ["distinct", "distinct()"],
        reply: `distinct() removes duplicate elements from a stream.

List<Integer> nums =
    Arrays.asList(10,10,20,20,30);

nums.stream()
    .distinct()
    .forEach(System.out::println);`
    },

    {
        keywords: ["sorted", "sorted()"],
        reply: `sorted() sorts stream elements.

List<Integer> nums =
    Arrays.asList(30,10,20);

nums.stream()
    .sorted()
    .forEach(System.out::println);`
    },

    {
        keywords: ["reduce", "reduce()"],
        reply: `reduce() combines stream elements into one result.

List<Integer> nums =
    Arrays.asList(1,2,3,4);

int sum =
    nums.stream()
        .reduce(0, Integer::sum);

System.out.println(sum);`
    },

    {
        keywords: ["peek", "peek()"],
        reply: `peek() performs an action on stream elements, commonly for debugging.

nums.stream()
    .peek(n -> System.out.println("Value: " + n))
    .filter(n -> n > 10)
    .forEach(System.out::println);`
    },

    {
        keywords: ["limit", "limit()"],
        reply: `limit() restricts a stream to a maximum number of elements.

Stream.of(1,2,3,4,5)
    .limit(3)
    .forEach(System.out::println);`
    },

    {
        keywords: ["skip", "skip()"],
        reply: `skip() discards the first specified number of stream elements.

Stream.of(1,2,3,4,5)
    .skip(2)
    .forEach(System.out::println);

Output:
3
4
5`
    },

    {
        keywords: ["foreach", "forEach()"],
        reply: `forEach() performs an action for each stream element.

list.stream()
    .forEach(System.out::println);`
    },

    {
        keywords: ["foreachordered", "forEachOrdered()"],
        reply: `forEachOrdered() performs an action for each element while respecting encounter order, particularly useful with parallel streams.

list.parallelStream()
    .forEachOrdered(System.out::println);`
    },

    {
        keywords: ["toarray", "toArray()"],
        reply: `toArray() converts stream elements into an array.

Object[] arr =
    list.stream()
        .toArray();`
    },

    {
        keywords: ["collect", "collect()"],
        reply: `collect() is a terminal operation used to gather stream elements into a collection or another result.

List<Integer> result =
    nums.stream()
        .filter(n -> n > 10)
        .collect(Collectors.toList());`
    },


    // =========================================================
    // GENERAL CHATBOT COMMANDS
    // =========================================================

    {
        keywords: ["hello", "hi", "hey"],
        reply: `Hello! 👋 I am your Java Learning Assistant.

You can ask me about:
• OOP
• Java Basics
• Inheritance
• Packages
• Interfaces
• Exceptions
• Multithreading
• AWT
• Swing
• JDBC
• Collections
• Stream API`
    },

    {
        keywords: ["help", "what can you do"],
        reply: `I can explain Java topics, provide Java programs, syntax and examples.

Try:
"Explain abstraction"
"Program for inheritance"
"What is ArrayList?"
"Explain JDBC"
"Stream filter example"
"Explain multithreading"`
    },

    {
        keywords: ["thank", "thanks"],
        reply: `You're welcome! 😊 Keep learning Java.`
    },

    {
        keywords: ["bye", "goodbye"],
        reply: `Goodbye! 👋 All the best with your Java studies.`
    }





];

const TOPIC_LIST = "OOP basics, Java fundamentals, inheritance, packages & interfaces, exception handling, multithreading, event handling, Swing, JDBC, Collections, Stream API";
const DEFAULT_REPLY = "I didn't catch a matching keyword. Try asking about: " + TOPIC_LIST + ".";
const CHIPS = ["OOP concepts","Inheritance","Polymorphism","Exception handling","Threads","Collections","Stream operations","JDBC","Swing"];

function getReply(userText){
  const text = userText.toLowerCase();
  let best = null, bestScore = 0;
  for(const entry of KB){
    let score = 0;
    for(const kw of entry.keywords){ if(text.includes(kw)) score += kw.split(" ").length; }
    if(score > bestScore){ bestScore = score; best = entry; }
  }
  return best ? best.reply : DEFAULT_REPLY;
}

/* ---------- Build widget DOM ---------- */
const style = document.createElement('style');
style.textContent = `
#jb-toggle{position:fixed;bottom:22px;right:22px;width:58px;height:58px;border-radius:50%;
  background:linear-gradient(135deg,#38bdf8,#a78bfa);border:none;box-shadow:0 8px 24px rgba(0,0,0,.3);
  cursor:pointer;z-index:99998;font-size:26px;display:flex;align-items:center;justify-content:center;
  transition:transform .2s;}
#jb-toggle:hover{transform:scale(1.07);}
#jb-panel{position:fixed;bottom:92px;right:22px;width:340px;max-width:92vw;height:480px;max-height:75vh;
  background:#1e293b;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.45);
  display:none;flex-direction:column;overflow:hidden;z-index:99999;font-family:'Segoe UI',system-ui,sans-serif;}
#jb-panel.open{display:flex;}
#jb-header{padding:12px 14px;background:linear-gradient(90deg,#38bdf8,#a78bfa);color:#0f172a;
  display:flex;justify-content:space-between;align-items:center;}
#jb-header strong{font-size:.95rem;}
#jb-close{background:none;border:none;font-size:18px;cursor:pointer;color:#0f172a;line-height:1;}
#jb-chat{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#1e293b;}
.jb-msg{max-width:85%;padding:8px 12px;border-radius:10px;font-size:.82rem;line-height:1.4;white-space:pre-wrap;color:#e2e8f0;}
.jb-bot{background:#0e2a3f;border:1px solid #16465f;align-self:flex-start;border-bottom-left-radius:2px;}
.jb-user{background:#334155;align-self:flex-end;border-bottom-right-radius:2px;}
#jb-chips{display:flex;flex-wrap:wrap;gap:5px;padding:0 12px 8px;background:#1e293b;}
.jb-chip{background:#0e2a3f;border:1px solid #16465f;color:#38bdf8;padding:4px 8px;border-radius:14px;
  font-size:.68rem;cursor:pointer;}
.jb-chip:hover{background:#123650;}
#jb-form{display:flex;gap:6px;padding:10px;border-top:1px solid #334155;background:#16213a;}
#jb-input{flex:1;padding:8px 10px;border-radius:8px;border:1px solid #334155;background:#0f172a;
  color:#e2e8f0;font-size:.82rem;outline:none;}
#jb-input:focus{border-color:#38bdf8;}
#jb-send{padding:0 14px;border:none;border-radius:8px;background:#38bdf8;color:#0f172a;font-weight:600;
  cursor:pointer;font-size:.82rem;}
#jb-send:hover{background:#0ea5e9;}
`;
document.head.appendChild(style);

const toggle = document.createElement('button');
toggle.id = 'jb-toggle';
toggle.title = 'ACE JavaBot';
toggle.textContent = '🤖';

const panel = document.createElement('div');
panel.id = 'jb-panel';
panel.innerHTML = `
  <div id="jb-header"><strong>🤖 II YR CSE - G</strong><button id="jb-close">✕</button></div>
  <div id="jb-chat"></div>
  <div id="jb-chips"></div>
  <form id="jb-form">
    <input id="jb-input" type="text" placeholder="Ask about Java/OOP..." autocomplete="off" />
    <button id="jb-send" type="submit">Send</button>
  </form>
`;

document.body.appendChild(toggle);
document.body.appendChild(panel);

const chatEl = panel.querySelector('#jb-chat');
const chipsEl = panel.querySelector('#jb-chips');
const form = panel.querySelector('#jb-form');
const input = panel.querySelector('#jb-input');
const closeBtn = panel.querySelector('#jb-close');

function addMsg(text, cls){
  const div = document.createElement('div');
  div.className = 'jb-msg ' + cls;
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

let opened = false;
toggle.addEventListener('click', ()=>{
  panel.classList.toggle('open');
  if(!opened){
    opened = true;
    addMsg("Hi! We are II Yr CSE-G Student JavaBot🤖", 'jb-bot');
  }
});
closeBtn.addEventListener('click', ()=> panel.classList.remove('open'));

form.addEventListener('submit', function(e){
  e.preventDefault();
  const val = input.value.trim();
  if(!val) return;
  addMsg(val, 'jb-user');
  input.value = '';
  setTimeout(()=>{ addMsg(getReply(val), 'jb-bot'); }, 200);
});

CHIPS.forEach(topic=>{
  const chip = document.createElement('div');
  chip.className = 'jb-chip';
  chip.textContent = topic;
  chip.onclick = ()=>{
    addMsg(topic, 'jb-user');
    setTimeout(()=>{ addMsg(getReply(topic), 'jb-bot'); }, 150);
  };
  chipsEl.appendChild(chip);
});

})();
